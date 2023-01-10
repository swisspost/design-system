import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:6060',
    specPattern: ['./cypress/integration/internet-header/**/*.spec.ts'],
    includeShadowDom: true,
    chromeWebSecurity: false,
    watchForFileChanges: true,
    videoCompression: false,
    viewportHeight: 960,
    viewportWidth: 1280,
    excludeSpecPattern: ['**/examples/**/*.js', '**/e2e/**/*.js'],
    retries: {
      runMode: 1,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
