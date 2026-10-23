// SPEC §14: Instrumentation events (logged to console in demo; real build sends to analytics)

export type AnalyticsEventName =
  | 'review_viewed'
  | 'flag_opened'
  | 'redo_started'
  | 'take_checked'
  | 'take_kept'
  | 'redo_skipped'
  | 'submit_without_fixing'
  | 'status_changed'
  | 'round_cleared'
  | 'abandon_after_review';

export function logEvent(name: AnalyticsEventName, payload?: Record<string, unknown>): void {
  if (payload) {
    console.info(`[Pila8 Event] ${name}`, payload);
  } else {
    console.info(`[Pila8 Event] ${name}`);
  }
}
