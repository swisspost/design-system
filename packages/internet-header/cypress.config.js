const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9300',
    specPattern: ['cypress/e2e/**/*.cy.{ts,tsx}'],
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
    setupNodeEvents (on, config) {
      const wp = require('@cypress/webpack-preprocessor')

      const webpackOptions = {
        resolve: {
          extensions: ['.ts', '.js'],
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              loader: 'ts-loader',
            },
          ],
        },
      }

      on('file:preprocessor', wp({ webpackOptions }))

      return config
    },
  },
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
});
