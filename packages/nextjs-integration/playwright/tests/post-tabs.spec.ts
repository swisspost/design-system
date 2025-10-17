import { test, expect } from '@playwright/test';
import { captureComponentErrors, assertNoComponentErrors } from '../support/component-error-filter';

const TAB_COMPONENTS = ['post-tabs', 'post-tab-item', 'post-tab-panel'];

test.describe('Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
  });

  test.describe('Panel mode', () => {
    test('should render tabs component', async ({ page }) => {
      const tabs = page.locator('post-tabs').first();
      await expect(tabs).toBeAttached();
      await expect(tabs).toBeVisible();
    });

    test('should render tab items', async ({ page }) => {
      const tabItems = page.locator('post-tabs').first().locator('post-tab-item');
      await expect(tabItems).toHaveCount(3);
    });

    test('should render tab panels', async ({ page }) => {
      const tabPanels = page.locator('post-tabs').first().locator('post-tab-panel');
      await expect(tabPanels).toHaveCount(3);
    });

    test('should be hydrated', async ({ page }) => {
      const tabs = page.locator('post-tabs').first();
      await expect(tabs).toHaveAttribute('data-hydrated', '', { timeout: 5000 });
    });

    test('should not have console errors from tabs components', async ({ page }) => {
      const errors = captureComponentErrors(page, TAB_COMPONENTS);

      await page.goto('/ssr');
      await page.locator('post-tabs').first().waitFor();
      
      await page.waitForTimeout(500);
      
      assertNoComponentErrors(errors, TAB_COMPONENTS);
    });

    test('should not have errors when clicking a tab', async ({ page }) => {
      const errors = captureComponentErrors(page, TAB_COMPONENTS);

      await page.goto('/ssr');
      
      const tabItems = page.locator('post-tabs').first().locator('post-tab-item');
      
      await tabItems.nth(1).click();
      await page.waitForTimeout(200);
      
      assertNoComponentErrors(errors, TAB_COMPONENTS);
    });
  });

  test.describe('Navigation mode', () => {
    test('should render tabs component', async ({ page }) => {
      const tabs = page.locator('post-tabs').last();
      await expect(tabs).toBeAttached();
      await expect(tabs).toBeVisible();
    });

    test('should render tab items with anchor links', async ({ page }) => {
      const tabItems = page.locator('post-tabs').last().locator('post-tab-item');
      await expect(tabItems).toHaveCount(3);
      
      const anchors = page.locator('post-tabs').last().locator('post-tab-item a');
      await expect(anchors.first()).toBeVisible();
    });

    test('should be hydrated', async ({ page }) => {
      const tabs = page.locator('post-tabs').last();
      await expect(tabs).toHaveAttribute('data-hydrated', '', { timeout: 5000 });
    });

    test('should not have console errors from tabs components', async ({ page }) => {
      const errors = captureComponentErrors(page, TAB_COMPONENTS);

      await page.goto('/ssr');
      await page.locator('post-tabs').last().waitFor();
      
      await page.waitForTimeout(500);
      
      assertNoComponentErrors(errors, TAB_COMPONENTS);
    });

    test('should not have errors when clicking a navigation tab', async ({ page }) => {
      const errors = captureComponentErrors(page, TAB_COMPONENTS);

      await page.goto('/ssr');
      
      const tabItems = page.locator('post-tabs').last().locator('post-tab-item');
      
      await tabItems.nth(1).click();
      await page.waitForTimeout(200);
      
      assertNoComponentErrors(errors, TAB_COMPONENTS);
    });
  });
});
