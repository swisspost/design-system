import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9300',
    excludeSpecPattern: ["**/examples/**/*.cy.js"],
    supportFile: false
  },
  chromeWebSecurity: false,
  includeShadowDom: true,
  retries: {
    runMode: 1
  },
  screenshotOnRunFailure: false,
  video: false,
  videoCompression: false,
  watchForFileChanges: true
});
