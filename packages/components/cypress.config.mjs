import { defineConfig } from 'cypress';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
import { version } from './package.json';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9001',
    specPattern: ['cypress/e2e/**/*.cy.{ts,tsx}'],
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
    env: {
      PACKAGE_VERSION: version,
    },
  },
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
});
