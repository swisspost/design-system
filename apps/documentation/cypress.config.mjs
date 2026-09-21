import { defineConfig } from 'cypress';

import post from '@swisspost/design-system-cypress-config';

export default defineConfig({
  ...post,
  e2e: {
    ...post.e2e,
    baseUrl: 'http://localhost:9001',
    specPattern: ['cypress/e2e/**/*.cy.{ts,tsx}'],
    // Axe scans the full-variant snapshot pages, which can exceed the 4s default on CI.
    // That's why we increase the timeout time to 15s, to reduce flaky tests!
    defaultCommandTimeout: 15000,
  },
});
