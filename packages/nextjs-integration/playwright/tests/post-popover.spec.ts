import { test, expect, Locator } from '@playwright/test';

test.describe('Popover', () => {
  let popover: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/csr');

    // Locate the hydrated popover component
    popover = page.locator('post-popover[data-hydrated]');

    // Wait until it exists
    await popover.waitFor();
  });

  test('should exist on the page', async () => {
    await expect(popover).toHaveCount(1);
    await expect(popover).toBeVisible();
  });
});
