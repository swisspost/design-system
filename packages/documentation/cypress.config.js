const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9300',
    specPattern: ['./cypress/e2e/**/*.spec.ts']
  },
  includeShadowDom: true,
  retries: {
    runMode: 1
  },
  video: false,
  videoCompression: false
});
