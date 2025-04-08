import { test, expect } from '@playwright/test';
test('accordion default visual regression', async ({ page }) => {
  await page.goto('http://localhost:9000/iframe.html?viewMode=story&id=4d1b4185-e04d-494a-ab38-2b56c1778b0b--default', {
    waitUntil: 'networkidle',
  });

  await page.waitForTimeout(1000);

  const accordion = page.locator('post-accordion').first();

  await expect(accordion).toHaveScreenshot('accordion.png', {
    timeout: 10000,
  });
});
