import { test, expect, Page } from '@playwright/test';
import { waitForHeaderReady } from './helpers/header-test-helpers';
import {
  TEST_BREAKPOINTS,
  TEST_MATRIX,
  STATE_HANDLERS,
  CLEANUP_HANDLERS,
} from './helpers/header-test-config';

async function executeTest(
  page: Page,
  state: string,
  variant: string,
  breakpoint: string
): Promise<void> {
  const handler = STATE_HANDLERS[state];
  
  if (!handler) {
    throw new Error(`No state handler found for: ${state}`);
  }

  await handler(page);
  await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-${state}.png`);
  
  const cleanup = CLEANUP_HANDLERS[state];
  if (cleanup) {
    await cleanup(page);
  }
}

// Iterate through all variants in TEST_MATRIX
Object.entries(TEST_MATRIX).forEach(([variant, breakpointConfig]) => {
  test.describe(`Header: ${variant}`, () => {
    
    TEST_BREAKPOINTS.forEach(({ name: breakpoint, width, height }) => {
      const config = breakpointConfig[breakpoint];
      
      test.describe(`${breakpoint} (${width}x${height})`, () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width, height });
          await page.goto(`/visual-tests/post-header-${variant}.html`);
          await waitForHeaderReady(page);
        });

        const isLoggedInVariant = variant.includes('loggedin');
        const isBreakpointToSkipDefault =
          breakpoint === 'mobile' || breakpoint === 'tablet' || breakpoint === 'desktop';
        const shouldRunDefault = !(isLoggedInVariant && isBreakpointToSkipDefault);

        if (shouldRunDefault) {
          test('default', async ({ page }) => {
            await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-default.png`);
          });
        }

        if (config.states.length > 0) {
          config.states.forEach(state => {
            test(state, async ({ page }) => {
              await executeTest(page, state, variant, breakpoint);
            });
          });
        }
      });
    });
  });
});