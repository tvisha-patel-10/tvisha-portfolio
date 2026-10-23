import type { Flag, FlagStatus, ReviewStatus, Scenario } from '../types';
import { MOCK_FLAGS, V2_UNFIXABLE_FLAG } from '../data/mock';

export const REDO_CAP_PER_PERSON = 3;

/**
 * Returns the effective flag list for a given scenario per SPEC §6, §7, and §18:
 * - default: F1, F2, F3, F4 as defined
 * - looks_good (V1): F2 and F3 demoted to low severity ("Optional polish"); F1 and F4 hidden.
 * - likely_to_fail (V2): only F9 (unfixable dropout).
 */
export function getScenarioFlags(scenario: Scenario): Flag[] {
  if (scenario === 'likely_to_fail') {
    return [{ ...V2_UNFIXABLE_FLAG }];
  }

  if (scenario === 'looks_good') {
    return MOCK_FLAGS.filter((f) => f.id === 'F2' || f.id === 'F3').map((f) => ({
      ...f,
      severity: 'low'
    }));
  }

  return [...MOCK_FLAGS];
}

/**
 * Computes the review status based on open flags and caps per SPEC §6:
 * - Looks good: no open High or Medium flags. Open Low flags are shown as "Optional polish".
 * - Likely to be flagged: at least one open High or Medium flag, and all open flags are fixable within caps.
 * - Likely to fail: any open flag marked fixable: false, or more fixable flags than caps allow for either person (User or Assistant).
 *
 * Note: Skipped flags stay open. A flag is open until a take is kept as Fixed.
 */
export function calculateReviewStatus(
  flags: Flag[],
  flagStates: Record<string, FlagStatus>
): ReviewStatus {
  // 1. Check for unfixable open flags
  const openFlags = flags.filter((f) => {
    const status = flagStates[f.id] ?? 'open';
    return status === 'open' || status === 'skipped';
  });

  const hasUnfixable = openFlags.some((f) => !f.fixable);
  if (hasUnfixable) {
    return 'Likely to fail';
  }

  // 2. Check redo caps per person (3 redo segments per person per round per SPEC §2)
  const openUserFixes = openFlags.filter((f) => f.fixBy === 'User').length;
  const openAssistantFixes = openFlags.filter((f) => f.fixBy === 'Assistant').length;

  if (openUserFixes > REDO_CAP_PER_PERSON || openAssistantFixes > REDO_CAP_PER_PERSON) {
    return 'Likely to fail';
  }

  // 3. Check severity of open flags
  const hasOpenHighOrMed = openFlags.some(
    (f) => f.severity === 'high' || f.severity === 'medium'
  );

  if (hasOpenHighOrMed) {
    return 'Likely to be flagged';
  }

  // If no open high or medium flags, it's "Looks good" (low severity flags are optional polish)
  return 'Looks good';
}
