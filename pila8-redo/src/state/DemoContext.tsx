import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type {
  Role,
  Scenario,
  TakeOutcomeMode,
  PartnerSimMode,
  FlagStatus,
  FlagRedoState,
  ReviewStatus,
  Flag
} from '../types';
import { getScenarioFlags, calculateReviewStatus } from '../lib/status';

export interface DemoState {
  viewAs: Role;
  scenario: Scenario;
  takeOutcomeMode: TakeOutcomeMode;
  partnerMode: PartnerSimMode;
  partnerFixedFlags: string[];
  reduceMotion: boolean;
  playbackSpeed: 1 | 4;
  flagsState: Record<string, FlagStatus>;
  takes: Record<string, FlagRedoState>;
}

export type DemoAction =
  | { type: 'SET_VIEW_AS'; payload: Role }
  | { type: 'SET_SCENARIO'; payload: Scenario }
  | { type: 'SET_TAKE_OUTCOME_MODE'; payload: TakeOutcomeMode }
  | { type: 'SET_PARTNER_MODE'; payload: PartnerSimMode }
  | { type: 'PARTNER_FIX_FLAG'; payload: string }
  | { type: 'SET_REDUCE_MOTION'; payload: boolean }
  | { type: 'SET_PLAYBACK_SPEED'; payload: 1 | 4 }
  | {
      type: 'RECORD_TAKE';
      payload: { flagId: string; result: 'fixed' | 'still_flagged'; reason?: string; hint?: string };
    }
  | {
      type: 'KEEP_TAKE';
      payload: { flagId: string; choice: 'original' | 'take1' | 'take2'; isFixed: boolean };
    }
  | { type: 'SKIP_FLAG'; payload: string }
  | { type: 'RESET_DEMO' };

const INITIAL_FLAGS_STATE: Record<string, FlagStatus> = {
  F1: 'open',
  F2: 'open',
  F3: 'open',
  F4: 'open',
  F9: 'open'
};

const INITIAL_STATE: DemoState = {
  viewAs: 'User',
  scenario: 'default',
  takeOutcomeMode: 'default',
  partnerMode: 'working',
  partnerFixedFlags: [],
  reduceMotion: false,
  playbackSpeed: 1,
  flagsState: { ...INITIAL_FLAGS_STATE },
  takes: {}
};

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'SET_VIEW_AS':
      return { ...state, viewAs: action.payload };

    case 'SET_SCENARIO':
      return {
        ...state,
        scenario: action.payload,
        // Reset flags state when switching scenarios
        flagsState: { ...INITIAL_FLAGS_STATE },
        partnerFixedFlags: [],
        takes: {}
      };

    case 'SET_TAKE_OUTCOME_MODE':
      return { ...state, takeOutcomeMode: action.payload };

    case 'SET_PARTNER_MODE':
      return { ...state, partnerMode: action.payload };

    case 'PARTNER_FIX_FLAG': {
      const updatedFixed = state.partnerFixedFlags.includes(action.payload)
        ? state.partnerFixedFlags
        : [...state.partnerFixedFlags, action.payload];
      return {
        ...state,
        partnerFixedFlags: updatedFixed,
        flagsState: {
          ...state.flagsState,
          [action.payload]: 'fixed'
        }
      };
    }

    case 'SET_REDUCE_MOTION':
      return { ...state, reduceMotion: action.payload };

    case 'SET_PLAYBACK_SPEED':
      return { ...state, playbackSpeed: action.payload };

    case 'RECORD_TAKE': {
      const { flagId, result, reason, hint } = action.payload;
      const currentTakes = state.takes[flagId] || {
        attempts: [],
        keptTake: null,
        status: 'open'
      };
      const takeNumber = (currentTakes.attempts.length + 1) as 1 | 2;
      const newAttempt = {
        takeNumber,
        result,
        timestamp: Date.now(),
        reason,
        hint
      };

      return {
        ...state,
        takes: {
          ...state.takes,
          [flagId]: {
            ...currentTakes,
            attempts: [...currentTakes.attempts, newAttempt]
          }
        }
      };
    }

    case 'KEEP_TAKE': {
      const { flagId, choice, isFixed } = action.payload;
      const currentTakes = state.takes[flagId] || {
        attempts: [],
        keptTake: null,
        status: 'open'
      };
      const newStatus: FlagStatus = isFixed ? 'fixed' : 'open';

      return {
        ...state,
        flagsState: {
          ...state.flagsState,
          [flagId]: newStatus
        },
        takes: {
          ...state.takes,
          [flagId]: {
            ...currentTakes,
            keptTake: choice,
            status: newStatus
          }
        }
      };
    }

    case 'SKIP_FLAG': {
      return {
        ...state,
        flagsState: {
          ...state.flagsState,
          [action.payload]: 'skipped'
        }
      };
    }

    case 'RESET_DEMO':
      return {
        ...INITIAL_STATE,
        // preserve demo controls user preferences if desired, but resets state
        viewAs: state.viewAs,
        reduceMotion: state.reduceMotion
      };

    default:
      return state;
  }
}

interface DemoContextValue {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
  activeFlags: Flag[];
  reviewStatus: ReviewStatus;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

const SESSION_STORAGE_KEY = 'pila8_demo_settings';

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(demoReducer, INITIAL_STATE, (init) => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...init,
          viewAs: parsed.viewAs ?? init.viewAs,
          scenario: parsed.scenario ?? init.scenario,
          takeOutcomeMode: parsed.takeOutcomeMode ?? init.takeOutcomeMode,
          reduceMotion: parsed.reduceMotion ?? init.reduceMotion,
          playbackSpeed: parsed.playbackSpeed ?? init.playbackSpeed
        };
      }
    } catch {
      // ignore storage parsing errors
    }
    return init;
  });

  // Save control settings to sessionStorage per SPEC §8 & §13
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          viewAs: state.viewAs,
          scenario: state.scenario,
          takeOutcomeMode: state.takeOutcomeMode,
          reduceMotion: state.reduceMotion,
          playbackSpeed: state.playbackSpeed
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [state.viewAs, state.scenario, state.takeOutcomeMode, state.reduceMotion, state.playbackSpeed]);

  const activeFlags = getScenarioFlags(state.scenario);
  const reviewStatus = calculateReviewStatus(activeFlags, state.flagsState);

  return (
    <DemoContext.Provider value={{ state, dispatch, activeFlags, reviewStatus }}>
      {children}
    </DemoContext.Provider>
  );
};

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
