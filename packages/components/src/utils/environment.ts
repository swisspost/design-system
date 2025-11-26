/**
 * Environment detection helper
 *
 * Goal: Distinguish between real browser execution and Stencil's server-side
 * hydration context. During SSR/hydration Stencil provides a mocked `window`
 * (Domino / JSDOM–like) so naive checks (e.g. `typeof window !== 'undefined'`)
 * incorrectly classify the environment as a browser.
 *
 * Current heuristic:
 * - Stencil's hydrate runner sets up a mock navigator whose `userAgent` is
 *   `'MockNavigator'` (a value a real browser will never expose).
 * - In a real browser we have `window` and the userAgent is not that value.
 *
 * Therefore we treat the presence of `window` plus a non-mocked userAgent as
 * browser; otherwise we assume server/hydrate.
 *
 * Notes & Limitations:
 * - This relies on the hydrate implementation continuing to use the literal
 *   `'MockNavigator'`. If that ever changes the detection must be updated.
 */
const IS_STENCIL_HYDRATION_APP = window && window.navigator.userAgent === 'MockNavigator';

export const IS_BROWSER: boolean = !IS_STENCIL_HYDRATION_APP && typeof window !== 'undefined';
export const IS_SERVER: boolean = !IS_BROWSER;
