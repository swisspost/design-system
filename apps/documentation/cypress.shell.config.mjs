import { defineConfig } from 'cypress';

import config from './cypress.config.mjs';

/**
 * The shell specs run against the built documentation (`pnpm preview`): shell and preview on one origin,
 * as on Netlify. The other specs open `iframe.html` on the Storybook dev server (`cypress.config.mjs`).
 */
export default defineConfig({
  ...config,
  e2e: {
    ...config.e2e,
    baseUrl: 'http://localhost:9000',
    specPattern: ['cypress/e2e/shell/**/*.cy.ts'],
    excludeSpecPattern: [],
  },
});
