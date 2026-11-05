/**
 * Channel events defined by the shell itself, on top of Storybook's core events.
 * Shared with the preview side, `.storybook/helpers/shell-bridge.ts`.
 */

/** Shell → preview: scroll the docs page to the given `#hash`, or to the top when it is empty. */
export const SHELL_SCROLL_TO_HASH = 'swisspost-shell/scroll-to-hash';
