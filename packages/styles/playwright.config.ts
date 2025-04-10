import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  timeout: 60 * 1000,
  testDir: './visual-tests',
  outputDir: './visual-tests/test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',
  workers: isCI ? 4 : 2,
  forbidOnly: isCI,

  reporter: [
    ['html', { outputFolder: './visual-tests/playwright-report' }],
    isCI ? ['github'] : ['list']
  ],

  use: {
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },

  expect: {
    toHaveScreenshot: {
      threshold: 0.1,
      maxDiffPixelRatio: 0.03,
      animations: 'disabled'
    },
    toMatchSnapshot: {
      threshold: 0.1,
      maxDiffPixelRatio: 0.03,
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
  ]
});
