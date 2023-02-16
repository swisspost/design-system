const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9300',
    specPattern: ['cypress/**/*.snapshot.{ts,tsx}'],
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
  },
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
});
