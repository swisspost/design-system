import { test } from '@playwright/test';
import { captureComponentErrors, assertNoComponentErrors } from '../support/component-error-filter';

const TAB_COMPONENTS = ['post-tabs', 'post-tab-item', 'post-tab-panel'];

test.describe('Tabs - Specific Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
  });

  test.describe('Panel mode', () => {
    test('should switch between tabs without errors', async ({ page }) => {
      const errors = captureComponentErrors(page, TAB_COMPONENTS);
      
      const tabItems = page.locator('post-tabs').first().locator('post-tab-item');
      
      for (let i = 0; i < await tabItems.count(); i++) {
        await tabItems.nth(i).click();
        await page.waitForTimeout(100);
      }
      
      assertNoComponentErrors(errors, TAB_COMPONENTS);
    });
  });

  test.describe('Navigation mode', () => {
    test('should navigate when clicking anchor links', async ({ page }) => {
      const errors = captureComponentErrors(page, TAB_COMPONENTS);
      
      const firstAnchor = page.locator('post-tabs').last().locator('post-tab-item a').first();
      await firstAnchor.click();
      await page.waitForTimeout(200);
      
      assertNoComponentErrors(errors, TAB_COMPONENTS);
    });
  });
});