import { defineConfig } from 'cypress';
import { browsersPlugin } from '../plugins/browsers.js';

export default defineConfig({
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
  e2e: {
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
    async setupNodeEvents(_on, config) {
      await browsersPlugin(config);
      return config;
    },
  },
});
