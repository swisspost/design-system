import { defineConfig } from 'cypress';
import { installBrowser, BROWSER } from './browser.mjs';

const UNSUPPORTED_BROWSERS = new Set(['chrome', 'electron']);

export default defineConfig({
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
  e2e: {
    defaultBrowser: BROWSER.name,
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
    async setupNodeEvents(_on, config) {
      const browser = await installBrowser();

      config.browsers = [
        ...config.browsers.filter(browser => !UNSUPPORTED_BROWSERS.has(browser.name)),
        {
          name: BROWSER.name,
          family: BROWSER.family,
          channel: BROWSER.channel,
          displayName: BROWSER.displayName,
          version: browser.buildId,
          majorVersion: parseInt(browser.buildId, 10),
          path: browser.executablePath,
        },
      ];

      return config;
    },
  },
});
