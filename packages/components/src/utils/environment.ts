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
 *   `isHydrateApp` detection.
 *   To circumvent this, we use a global flag (`isHydrateAppTestEnv`),
 *   that we set/reset during the server test, so we can correctly identify
 *   the hydrate app in the test context.
 *   As a drawback, we can't properly test if the hydrate app is detected as
 *   expected, in a real world scenario (elsewhere than in our tests).
 */

const MOCKED_USERAGENT = 'MockNavigator';
const MOCKED_ORIGIN = 'http://mockdoc.stenciljs.com';

const isNodeEnv = typeof global !== 'undefined';
const hasWindow = typeof window !== 'undefined';
const isMockedUserAgent = hasWindow && window.navigator.userAgent === MOCKED_USERAGENT;
const isMockedOrigin = hasWindow && window.location.origin === MOCKED_ORIGIN;

/**
 * This is the natural hydrate app environment
 * Is `true` if the hydrate app runs on server
 */
const isHydrateAppEnv = isNodeEnv && isMockedUserAgent && isMockedOrigin;

/**
 * This is the test app server test env
 * Is `true` if the server unit test runs (`false` if the browser unit test runs)
 */
const isTestAppServerTestEnv = isNodeEnv && isMockedUserAgent && global.IS_HYDRATEAPP_SERVERTEST;

/**
 * This is the final hydrate app flag
 * if it`s `true`, IS_BROWSER equals `false` and IS_SERVER equals `true
 */
const isHydrateApp = isHydrateAppEnv || isTestAppServerTestEnv;

export const IS_BROWSER: boolean = hasWindow && !isHydrateApp;
export const IS_SERVER: boolean = !IS_BROWSER;
