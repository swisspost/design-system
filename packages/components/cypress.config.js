import { defineConfig } from 'cypress';
import pkg from './package.json' with { type: 'json' };
import * as fs from 'fs';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9001',
    specPattern: ['cypress/e2e/**/*.cy.{ts,tsx}'],
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
    env: {
      PACKAGE_VERSION: pkg.version,
    },
    setupNodeEvents(on) {
      on('task', {
        readJsonFile(filePath) {
          try {
            fs.mkdirSync('output', { recursive: true });
            if (!fs.existsSync(filePath)) {
              fs.writeFileSync(filePath, '{}', 'utf-8');
              return {};
            }
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          } catch {
            return {};
          }
        },
      });
    },
  },
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
});
