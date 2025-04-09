import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:9000';
const isCI = !!process.env.CI;

export default defineConfig({
  timeout: 60 * 1000,
  testDir: './visual-tests',
  outputDir: './visual-tests/test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  workers: isCI ? 4 : 2,
  forbidOnly: isCI,

  reporter: [
    ['html', { outputFolder: './visual-tests/playwright-report' }],
    isCI ? ['github'] : ['list']
  ],

  use: {
    baseURL,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },

  expect: {
    toHaveScreenshot: {
      threshold: 0.1,
      maxDiffPixelRatio: 0.025,
      animations: 'disabled'
    },
    toMatchSnapshot: {
      threshold: 0.1,
      maxDiffPixelRatio: 0.025,
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
