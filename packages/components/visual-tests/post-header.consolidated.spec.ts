import { test, expect, Page } from '@playwright/test';
import { waitForHeaderReady } from './helpers/header-test-helpers';
import {
  TEST_BREAKPOINTS,
  TEST_MATRIX,
  HOVER_HANDLERS,
  FOCUS_HANDLERS,
  STATE_HANDLERS,
  CLEANUP_HANDLERS,
  type BreakpointName,
} from './helpers/header-test-config';

/**
 * Generic test executor
 */
async function executeTest(
  page: Page,
  interaction: string,
  variant: string,
  breakpoint: string,
  type: 'hover' | 'focus' | 'state'
): Promise<void> {
  let handlers;
  if (type === 'hover') {
    handlers = HOVER_HANDLERS;
  } else if (type === 'focus') {
    handlers = FOCUS_HANDLERS;
  } else {
    handlers = STATE_HANDLERS;
  }
  
  const handler = handlers[interaction];
  
  if (!handler) {
    throw new Error(`No ${type} handler found for interaction: ${interaction}`);
  }

  await handler(page);
  await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-${interaction}-${type}.png`);
  
  // Cleanup if needed
  const cleanup = CLEANUP_HANDLERS[interaction];
  if (cleanup) {
    await cleanup(page);
  }
}

/**
 * Main test suite
 */
Object.entries(TEST_MATRIX).forEach(([variant, breakpointConfig]) => {
  test.describe(`Header: ${variant}`, () => {
    
    TEST_BREAKPOINTS.forEach(({ name: breakpoint, width, height }) => {
      const config = breakpointConfig[breakpoint as BreakpointName];
      
      test.describe(`${breakpoint} (${width}x${height})`, () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width, height });
          await page.goto(`/visual-tests/post-header-${variant}.html`);
          await waitForHeaderReady(page);
        });

        // All variants test default state to catch layout/height regressions
        test('default', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-default.png`);
        });

        // State tests (including scrolled state for desktop)
        if (config.states.length > 0) {
          config.states.forEach(state => {
            test(state, async ({ page }) => {
              await executeTest(page, state, variant, breakpoint, 'state');
            });
          });
        }

        // Hover tests
        if (config.hover.length > 0) {
          config.hover.forEach(interaction => {
            test(`${interaction} hover`, async ({ page }) => {
              await executeTest(page, interaction, variant, breakpoint, 'hover');
            });
          });
        }

        // Focus tests
        if (config.focus.length > 0) {
          config.focus.forEach(interaction => {
            test(`${interaction} focus`, async ({ page }) => {
              await executeTest(page, interaction, variant, breakpoint, 'focus');
            });
          });
        }
      });
    });
  });
});