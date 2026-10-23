import React, { useState } from 'react';
import { useDemo } from '../state/DemoContext';
import type { Role, Scenario, TakeOutcomeMode, PartnerSimMode } from '../types';
import { GearIcon, CloseIcon } from './common/Icons';
import './DemoControlsPanel.css';

export const DemoControlsPanel: React.FC = () => {
  const { state, dispatch } = useDemo();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="demo-controls-wrapper" aria-label="Demo controls panel">
      <button
        type="button"
        className="demo-controls-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="demo-controls-content"
      >
        <GearIcon size={16} className="gear-icon" />
        Demo controls
      </button>

      {isOpen && (
        <div id="demo-controls-content" className="demo-controls-dialog" role="region" aria-label="Demo control options">
          <div className="demo-controls-header">
            <h3>Demo Controls</h3>
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close demo controls"
            >
              <CloseIcon size={16} />
            </button>
          </div>

          <div className="control-group">
            <label htmlFor="control-view-as">View as</label>
            <select
              id="control-view-as"
              value={state.viewAs}
              onChange={(e) =>
                dispatch({ type: 'SET_VIEW_AS', payload: e.target.value as Role })
              }
            >
              <option value="User">User (Maya)</option>
              <option value="Assistant">Assistant (Dave)</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="control-scenario">Scenario</label>
            <select
              id="control-scenario"
              value={state.scenario}
              onChange={(e) =>
                dispatch({ type: 'SET_SCENARIO', payload: e.target.value as Scenario })
              }
            >
              <option value="default">Likely to be flagged (Default)</option>
              <option value="looks_good">Looks good (V1)</option>
              <option value="likely_to_fail">Likely to fail (V2)</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="control-take-outcome">Take outcome</label>
            <select
              id="control-take-outcome"
              value={state.takeOutcomeMode}
              onChange={(e) =>
                dispatch({
                  type: 'SET_TAKE_OUTCOME_MODE',
                  payload: e.target.value as TakeOutcomeMode
                })
              }
            >
              <option value="default">Default (F3 fails once, then fixed)</option>
              <option value="always_fixed">Always fixed</option>
              <option value="always_still_flagged">Always still flagged</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="control-partner">Partner</label>
            <select
              id="control-partner"
              value={state.partnerMode}
              onChange={(e) =>
                dispatch({
                  type: 'SET_PARTNER_MODE',
                  payload: e.target.value as PartnerSimMode
                })
              }
            >
              <option value="working">Working (auto ~25s)</option>
              <option value="completed">Complete now</option>
              <option value="skipped">Skipped</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="control-speed">Playback speed</label>
            <select
              id="control-speed"
              value={state.playbackSpeed}
              onChange={(e) =>
                dispatch({
                  type: 'SET_PLAYBACK_SPEED',
                  payload: Number(e.target.value) as 1 | 4
                })
              }
            >
              <option value={1}>1×</option>
              <option value={4}>4×</option>
            </select>
          </div>

          <div className="control-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={state.reduceMotion}
                onChange={(e) =>
                  dispatch({ type: 'SET_REDUCE_MOTION', payload: e.target.checked })
                }
              />
              Reduce motion
            </label>
          </div>

          <div className="demo-controls-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                sessionStorage.removeItem('pila8_demo_settings');
                dispatch({ type: 'RESET_DEMO' });
              }}
            >
              Reset demo
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
