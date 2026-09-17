import { defineConfig } from 'eslint/config';

import cypress from 'eslint-plugin-cypress/flat';

export default defineConfig({
  name: 'post/cypress',
  files: ['cypress/**/*.{js,mjs,cjs,ts,mts,cts}', '**/*.cy.{js,mjs,cjs,ts,mts,cts}'],
  extends: [cypress.configs.recommended],
});
