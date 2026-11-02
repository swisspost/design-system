import { defineConfig } from 'cypress';

import config from './cypress.config.mjs';

export default defineConfig({
  ...config,
  projectId: 'f9aegu',
  e2e: {
    ...config.e2e,
    specPattern: ['cypress/**/*.snapshot.{ts,tsx}'],
  },
});
