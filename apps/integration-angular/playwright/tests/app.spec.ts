import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should run', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Hurray, it works!')).toBeVisible();
  });
});
