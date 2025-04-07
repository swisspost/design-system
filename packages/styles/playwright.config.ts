import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:9000';

export default defineConfig({
  testDir: './visual-tests',
  outputDir: './visual-tests/test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  workers: 4,
  retries: 1,
  reporter: [
    ['html', {
      outputFolder: './visual-tests/playwright-report'
    }],
    ['list']
  ],
  use: {
    baseURL,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      threshold: 0.1,
      animations: 'disabled',
    },
  },
});
