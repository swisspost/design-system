import { defineConfig } from 'cypress';
import { getInstalledBrowsers } from '@puppeteer/browsers';
import { homedir } from 'node:os';
import { join } from 'node:path';

const EXCLUDE_BROWSER_DISPLAY_NAMES = new Set([
  'Chrome', // removed in favor of chrome-for-testing
  'Electron', // deprecated, https://docs.cypress.io/app/references/launching-browsers#Electron-Browser
]);

// To install chrome-for-testing in defferent versions,
// update the "e2e:install-browsers" script in package.json
// examples:
// "e2e:install-browsers": "for v in stable beta 152; do browsers install chrome@$v --path ~/.cache/puppeteer; done"
// This would install chrome@stable, chrome@beta and chrome@152

// Expose the locally installed "Chrome for Testing" build as a selectable Cypress browser.
async function getChromeForTestingBrowsers() {
  // Cache directory used by `@puppeteer/browsers` (see the `e2e:install-chrome` script).
  const puppeteerCacheDir = join(homedir(), '.cache', 'puppeteer');
  const installed = await getInstalledBrowsers({ cacheDir: puppeteerCacheDir }).catch(() => []);

  const chromeBuilds = installed
    // Chrome for Testing builds are typed `chrome` in the puppeteer cache; we relabel them below.
    .filter(browser => browser.browser === 'chrome');

  if (chromeBuilds.length === 0) return [];

  const latestMajor = Math.max(...chromeBuilds.map(b => Number.parseInt(b.buildId, 10)));

  return chromeBuilds.map(browser => {
    const majorVersion = Number.parseInt(browser.buildId, 10);
    // Newest build gets the plain `chrome-for-testing` name; older builds keep a version suffix.
    const isLatest = majorVersion === latestMajor;

    return {
      name: isLatest ? 'chrome-for-testing' : `chrome-for-testing-${majorVersion}`,
      channel: 'stable',
      family: 'chromium',
      displayName: `Chrome for Testing ${browser.buildId}`,
      version: browser.buildId,
      majorVersion,
      path: browser.executablePath,
    };
  });
}

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9001',
    specPattern: ['cypress/e2e/**/*.cy.{ts,tsx}'],
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
    async setupNodeEvents(_on, config) {
      config.browsers = config.browsers
        .concat(...(await getChromeForTestingBrowsers()))
        .filter(b => !EXCLUDE_BROWSER_DISPLAY_NAMES.has(b.displayName));
      return config;
    },
  },
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
});
