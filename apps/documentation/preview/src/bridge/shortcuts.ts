import { getShortcut, type Shortcut } from '@shared/shortcuts';

/**
 * Hands the shortcuts of the shell to it, e.g. ⌘K for the search, instead of
 * the browser.
 */
export function forwardShortcuts(send: (name: Shortcut) => void): void {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    const shortcut = getShortcut(event);
    if (!shortcut) return;

    event.preventDefault();
    send(shortcut);
  });
}
