import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.KLP_PORT ?? 8443);

/**
 * The widget branches on `window.location.hostname` ending in `post.ch`, writes cookies with
 * `domain=post.ch` and `SameSite=None; Secure`, and talks cross-origin to int-n.post.ch. All of
 * that silently takes a different path on localhost, so the suite must run on real post.ch
 * hostnames. The names used are non-production (int.post.ch, int-n.post.ch) and never resolve
 * outside this process.
 *
 * Chromium can fake DNS per-process. Firefox and WebKit cannot, so they only run when the host
 * machine resolves the names itself:
 *   echo '127.0.0.1 int.post.ch int-n.post.ch' | sudo tee -a /etc/hosts
 *   KLP_HOSTS=1 pnpm e2e
 */
const hostResolverRules = `MAP *.post.ch 127.0.0.1:${PORT}, MAP post.ch 127.0.0.1:${PORT}`;
const useSystemHosts = process.env.KLP_HOSTS === '1';

/** V8 coverage slows the page enough that the default poll budgets race the keep-alive pixels. */
const collectingCoverage = process.env.KLP_COVERAGE === '1';

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: false, // the fake API holds a single mutable scenario
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  timeout: collectingCoverage ? 60_000 : 30_000,
  expect: { timeout: collectingCoverage ? 15_000 : 5_000 },

  use: {
    baseURL: 'https://int.post.ch/',
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [`--host-resolver-rules=${hostResolverRules}`, '--ignore-certificate-errors'],
        },
      },
    },
    ...(useSystemHosts
      ? [
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        ]
      : []),
  ],

  webServer: {
    command: `node test/server/index.js`,
    url: `https://127.0.0.1:${PORT}/index.html`,
    ignoreHTTPSErrors: true,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
