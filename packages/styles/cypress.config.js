const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9301',
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}'
  },
  video: false
})
