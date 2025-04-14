import { test, expect } from '@playwright/test';
import path from 'path';

test('button default visual regression', async ({ page }) => {
  await page.goto(
    'http://localhost:5173/',
    { waitUntil: 'networkidle' }
  );

  const button = page.locator('button.btn-primary').first();

  await expect(button).toBeVisible();

  await expect(button).toHaveScreenshot('button-primary.png', {
    timeout: 10000,
  });
});
