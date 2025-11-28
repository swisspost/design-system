/**
 * Environment detection helper
 *
 * Goal: Distinguish between real browser execution and Stencil's server-side
 * hydration context. During SSR/hydration Stencil provides a mocked `window`
 * (Domino / JSDOM–like) so naive checks (e.g. `typeof window !== 'undefined'`)
 * incorrectly classify the environment as a browser.
 *
 * Detection strategy:
 * - Stencils hydrate context uses a hardcoded user agent string ('MockNavigator')
 *   and origin ('http://mockdoc.stenciljs.com') for its mocked `window` object.
 *   We can use this to identify the hydrate context.
 * - Stencils unit test context also uses the same hardcoded user agent string,
 *   but a differnet value for the origin.
 *   That's why comparing the origin is aboslutely mandatory.
 * - Since we test the hydrate app in the test context, the origin is getting
 *   overwritten by the test setup, leading to a false positive in the
 *   IS_HYDRATEAPP detection.
 *   To circumvent this, we use a global flag (`IS_HYDRATEAPP_TEST`),
 *   that we set/reset during the server test, so we can correctly identify
 *   the hydrate app in the test context.
 *   As a drawback, we can't properly test if the hydrate app is detected as
 *   expected, in a real world scenario (elsewhere than in our tests).
 */

const HYDRATEAPP_USERAGENT = 'MockNavigator';
const HYDRATEAPP_ORIGIN = 'http://mockdoc.stenciljs.com';
const IS_HYDRATEAPP =
  global?.IS_HYDRATEAPP_TEST ||
  (window?.navigator.userAgent === HYDRATEAPP_USERAGENT &&
    window?.location.origin === HYDRATEAPP_ORIGIN);

export const IS_BROWSER: boolean = typeof window !== 'undefined' && !IS_HYDRATEAPP;
export const IS_SERVER: boolean = !IS_BROWSER;
