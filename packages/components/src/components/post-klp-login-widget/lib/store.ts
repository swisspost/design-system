/**
 * State that belongs to the session rather than to any one element: `post-klp-login-widget` shows
 * the unread count on the avatar while `post-klp-login-widget-messages` shows it in the menu, and
 * the consumer decides where that entry sits. Only the widget's controller writes, and only in the
 * browser, so a server render always reads the initial state.
 */

export interface KlpLoginWidgetState {
  unread: number;
}

const state: KlpLoginWidgetState = { unread: 0 };
const subscribers = new Set<(state: Readonly<KlpLoginWidgetState>) => void>();

export function setState<K extends keyof KlpLoginWidgetState>(
  key: K,
  value: KlpLoginWidgetState[K],
): void {
  if (state[key] === value) return;

  state[key] = value;
  subscribers.forEach(notify => notify(state));
}

/** Calls back immediately, so a late subscriber never misses what is already there. */
export function subscribe(notify: (state: Readonly<KlpLoginWidgetState>) => void): () => void {
  subscribers.add(notify);
  notify(state);

  return () => subscribers.delete(notify);
}
