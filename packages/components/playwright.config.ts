import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './visual-tests',

  // Match both .js and .ts spec files
  testMatch: '**/*.spec.{js,ts}',

  timeout: 30000,

  expect: {
    // Configure visual comparison
    threshold: 0.2,
    toHaveScreenshot: {
      threshold: 0.2,
      mode: 'strict'
    }
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['list']
  ],

  // Configure snapshot path to match your expected structure
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',

  outputDir: 'test-results/artifacts',

  use: {
    // Fix the baseURL to match your web server
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

  // Fix the web server configuration
  webServer: {
    command: 'npx http-server . -p 9300',
    url: 'http://localhost:9300',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
