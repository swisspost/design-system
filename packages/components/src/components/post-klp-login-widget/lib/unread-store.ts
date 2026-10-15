/**
 * The unread count belongs to the session, not to a component: the widget shows it on the avatar
 * while `post-klp-login-widget-messages` shows it in the menu, and the consumer decides where that
 * entry sits. Only the widget's controller writes, and only in the browser, so a server render
 * always reads the initial 0.
 */

let unread = 0;
const subscribers = new Set<(unread: number) => void>();

export function setUnread(next: number): void {
  if (next === unread) return;

  unread = next;
  subscribers.forEach(notify => notify(unread));
}

/** Calls back immediately, so a late subscriber never misses the current count. */
export function subscribeUnread(notify: (unread: number) => void): () => void {
  subscribers.add(notify);
  notify(unread);

  return () => subscribers.delete(notify);
}
