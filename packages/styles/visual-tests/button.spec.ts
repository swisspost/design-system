import { test, expect } from '@playwright/test';

test('button default visual regression', async ({ page }) => {
  await page.goto(
    'http://localhost:5173/',
    { waitUntil: 'networkidle' }
  );

  const button = page.locator('button.btn-primary').first();

  await page.evaluate(() => document.fonts.ready);

  await expect(button).toBeVisible();

  await expect(button).toHaveScreenshot('button-primary.png', {
    timeout: 10000,
    maxDiffPixelRatio: 0.03,
  });
});
