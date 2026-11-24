export type Shortcut = 'search';

const IS_APPLE = /Mac|iPhone|iPad/.test(navigator.userAgent);

/** The search shortcut: ⌘K on Apple devices, Ctrl+K elsewhere. */
export const SEARCH_SHORTCUT = {
  label: IS_APPLE ? '⌘K' : 'Ctrl K',
  keys: IS_APPLE ? 'Meta+K' : 'Control+K',
};

/** The shortcut of a key press, if it is one. */
export function getShortcut(event: KeyboardEvent): Shortcut | null {
  const hasModifier = IS_APPLE ? event.metaKey : event.ctrlKey;
  const hasOtherModifier =
    event.altKey || event.shiftKey || (IS_APPLE ? event.ctrlKey : event.metaKey);

  if (!hasModifier || hasOtherModifier) return null;
  return event.key.toLowerCase() === 'k' ? 'search' : null;
}
