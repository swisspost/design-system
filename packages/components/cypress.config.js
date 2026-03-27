import { defineConfig } from 'cypress';
import pkg from './package.json' with { type: 'json' };
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const markupMapPath = path.resolve(__dirname, 'output/markup-map.json');

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
      on('before:run', () => {
        fs.mkdirSync(path.dirname(markupMapPath), { recursive: true });
        fs.writeFileSync(markupMapPath, '{}', 'utf-8');
        console.log('✅ Cleared markup-map.json');
      });

      on('task', {
        readJsonFile(filePath) {
          try {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
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
