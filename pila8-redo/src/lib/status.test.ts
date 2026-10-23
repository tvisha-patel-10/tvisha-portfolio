import { describe, it, expect } from 'vitest';
import { calculateReviewStatus, getScenarioFlags } from './status';
import type { Flag, FlagStatus } from '../types';

describe('Status calculation per SPEC §6 & §18', () => {
  it('calculates initial default state as "Likely to be flagged"', () => {
    const flags = getScenarioFlags('default');
    const initialFlagsState: Record<string, FlagStatus> = {
      F1: 'open',
      F2: 'open',
      F3: 'open',
      F4: 'open'
    };

    const status = calculateReviewStatus(flags, initialFlagsState);
    expect(status).toBe('Likely to be flagged');
  });

  it('calculates "Likely to fail" when there is an unfixable flag (V2 scenario)', () => {
    const flags = getScenarioFlags('likely_to_fail');
    const flagsState: Record<string, FlagStatus> = { F9: 'open' };

    const status = calculateReviewStatus(flags, flagsState);
    expect(status).toBe('Likely to fail');
  });

  it('calculates "Likely to fail" if open flags exceed the 3-redo cap per person', () => {
    const excessiveFlags: Flag[] = [
      { id: '1', bucket: 'Flow', kind: 'silence', start: 0, end: 5, owner: 'User', fixBy: 'User', severity: 'medium', fixable: true, title: 'T1', reason: 'R1' },
      { id: '2', bucket: 'Flow', kind: 'silence', start: 6, end: 10, owner: 'User', fixBy: 'User', severity: 'medium', fixable: true, title: 'T2', reason: 'R2' },
      { id: '3', bucket: 'Flow', kind: 'silence', start: 11, end: 15, owner: 'User', fixBy: 'User', severity: 'medium', fixable: true, title: 'T3', reason: 'R3' },
      { id: '4', bucket: 'Flow', kind: 'silence', start: 16, end: 20, owner: 'User', fixBy: 'User', severity: 'medium', fixable: true, title: 'T4', reason: 'R4' }
    ];
    const flagsState: Record<string, FlagStatus> = { '1': 'open', '2': 'open', '3': 'open', '4': 'open' };

    const status = calculateReviewStatus(excessiveFlags, flagsState);
    expect(status).toBe('Likely to fail');
  });

  it('calculates "Looks good" in V1 scenario where only low severity flags exist', () => {
    const flags = getScenarioFlags('looks_good');
    const flagsState: Record<string, FlagStatus> = { F2: 'open', F3: 'open' };

    const status = calculateReviewStatus(flags, flagsState);
    expect(status).toBe('Looks good');
  });

  it('recalculates step-by-step from "Likely to be flagged" to "Looks good" as flags are fixed', () => {
    const flags = getScenarioFlags('default');
    const flagsState: Record<string, FlagStatus> = {
      F1: 'open',
      F2: 'open',
      F3: 'open',
      F4: 'open'
    };

    // Initial state
    expect(calculateReviewStatus(flags, flagsState)).toBe('Likely to be flagged');

    // Fix F1
    flagsState.F1 = 'fixed';
    expect(calculateReviewStatus(flags, flagsState)).toBe('Likely to be flagged');

    // Fix F2
    flagsState.F2 = 'fixed';
    expect(calculateReviewStatus(flags, flagsState)).toBe('Likely to be flagged');

    // Fix F3
    flagsState.F3 = 'fixed';
    expect(calculateReviewStatus(flags, flagsState)).toBe('Likely to be flagged');

    // Fix F4 (final high/med flag resolved)
    flagsState.F4 = 'fixed';
    expect(calculateReviewStatus(flags, flagsState)).toBe('Looks good');
  });

  it('keeps status as "Likely to be flagged" if a flag is skipped instead of fixed', () => {
    const flags = getScenarioFlags('default');
    const flagsState: Record<string, FlagStatus> = {
      F1: 'fixed',
      F2: 'fixed',
      F3: 'fixed',
      F4: 'skipped' // skipped flags stay open per SPEC §6
    };

    expect(calculateReviewStatus(flags, flagsState)).toBe('Likely to be flagged');
  });
});
