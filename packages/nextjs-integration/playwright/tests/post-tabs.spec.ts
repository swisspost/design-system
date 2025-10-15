import { test, expect } from '@playwright/test';

test.describe('Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
  });

  test.describe('Panel mode', () => {
    test('should render tabs component', async ({ page }) => {
      await expect(page.locator('post-tabs').first()).toBeVisible();
    });

    test('should not have console errors', async ({ page }) => {
      const consoleErrors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.locator('post-tabs').first().waitFor();
      
      expect(consoleErrors).toHaveLength(0);
    });
  });

  test.describe('Navigation mode', () => {
    test('should render tabs component', async ({ page }) => {
      await expect(page.locator('post-tabs').last()).toBeVisible();
    });

    test('should not have console errors', async ({ page }) => {
      const consoleErrors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.locator('post-tabs').last().waitFor();
      
      expect(consoleErrors).toHaveLength(0);
    });
  });
});
