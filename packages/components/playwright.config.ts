import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './vrt',
  timeout: 30000,

  expect: {
    toHaveScreenshot: {
      threshold: 0.3,
      maxDiffPixelRatio: 0.05,
    }
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['list']
  ],

  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',

  outputDir: 'test-results/artifacts',

  use: {
    baseURL: 'http://localhost:9300',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npx http-server www -p 9300 -c-1',
    url: 'http://localhost:9300',
    reuseExistingServer: true,
    timeout: 60000,
  },
});