import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  
  testMatch: '**/*.spec.ts',
  
  timeout: 30000,
  
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['list']
  ],
  
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',
  
  outputDir: 'test-results/artifacts',
  
  use: {
    baseURL: 'http://localhost:9000',
  },
  
  // Projects for different browsers
  projects: [
    // Desktop Chrome
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    // Desktop Firefox
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    // Desktop Safari
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
  
  // Start a web server for the tests
  webServer: {
    command: 'npx http-server . -p 9000',
    url: 'http://localhost:9000',
    reuseExistingServer: true,
    timeout: 60000,
  },
});