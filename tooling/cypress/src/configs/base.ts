import { defineConfig } from 'cypress';
import { browsersPlugin } from '../plugins/browsers.js';

export default defineConfig({
  allowCypressEnv: false,
  includeShadowDom: true,
  retries: { runMode: 1 },
  video: false,
  e2e: {
    viewportWidth: 1024,
    viewportHeight: 576,
    async setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (!config.isTextTerminal && browser.family === 'chromium') {
          launchOptions.args = launchOptions.args.filter(arg => arg !== '--headless=new');
        }

        return launchOptions;
      });

      await browsersPlugin(config);
      return config;
    },
  },
});
