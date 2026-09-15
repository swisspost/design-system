import { mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { test as base } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const COVERAGE_DIR = join(__dirname, '../../.coverage');

/**
 * V8 coverage is Chromium-only and adds noticeable overhead, so it is opt-in via KLP_COVERAGE=1.
 * `resetOnNavigation: false` keeps the data from tests where the widget navigates away on logout.
 */
export const test = base.extend<{ collectCoverage: void }>({
  collectCoverage: [
    async ({ page, browserName }, use, testInfo) => {
      const enabled = process.env.KLP_COVERAGE === '1' && browserName === 'chromium';

      if (enabled) {
        await page.coverage.startJSCoverage({ resetOnNavigation: false });
      }

      await use();

      if (!enabled) return;

      const entries = await page.coverage.stopJSCoverage();
      mkdirSync(COVERAGE_DIR, { recursive: true });
      const id = createHash('sha1')
        .update(testInfo.titlePath.join(' > '))
        .digest('hex')
        .slice(0, 16);
      writeFileSync(join(COVERAGE_DIR, `${id}.json`), JSON.stringify(entries));
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
