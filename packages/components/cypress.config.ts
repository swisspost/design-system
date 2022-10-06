import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9303',
    excludeSpecPattern: ["**/examples/**/*.cy.js"],
    supportFile: false
  },
  chromeWebSecurity: false,
  includeShadowDom: true,
  retries: {
    runMode: 1
  },
  video: false,
  videoCompression: false,
  watchForFileChanges: true,
});
