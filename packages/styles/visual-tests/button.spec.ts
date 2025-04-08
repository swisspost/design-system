import { test, expect } from '@playwright/test';

test('button default visual regression', async ({ page }) => {
  await page.goto('http://localhost:9000/iframe.html?viewMode=story&id=eb78afcb-ce92-4990-94b6-6536d5ec6af4--default', {
    waitUntil: 'networkidle',
  });

  await page.waitForTimeout(1000);

  const button = page.locator('button.btn-primary').first();

  await expect(button).toBeVisible();

  await expect(button).toHaveScreenshot('button.png', {
    timeout: 10000,
    maxDiffPixelRatio: 0.01,
  });
});
