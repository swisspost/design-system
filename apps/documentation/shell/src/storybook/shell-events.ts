/**
 * Channel events defined by the shell itself, on top of Storybook's core events.
 * Shared with the preview side, `.storybook/helpers/shell-bridge.ts`.
 */

/** Shell → preview: scroll the docs page to the given `#hash`, or to the top when it is empty. */
export const SHELL_SCROLL_TO_HASH = 'swisspost-shell/scroll-to-hash';

/**
 * Shell → preview: the globals chosen in the toolbar (`DocsGlobals`). The preview applies them itself
 * (stylesheet, color scheme, palette). Storybook's `UPDATE_GLOBALS` is not used for docs pages: it
 * re-renders every story on the page, which makes the page jump.
 */
export const SHELL_GLOBALS = 'swisspost-shell/globals';

/**
 * Shell → preview: the page the shell shows, sent before the preview is asked to show it.
 * The preview puts `params` in its own URL, where docs content reads them (e.g. `story` and `args` of
 * a deep link, `spds-iconset` of the icon search), and builds its deep links on `url`.
 */
export const SHELL_PAGE = 'swisspost-shell/page';

export interface ShellPagePayload {
  /** Absolute shell URL of the page, without query and hash, e.g. `https://…/components/button` */
  url: string;
  /** The query params of the shell URL that belong to the page content */
  params: Record<string, string>;
}
