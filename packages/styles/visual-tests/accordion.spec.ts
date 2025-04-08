import { test, expect } from '@playwright/test';

test('accordion default visual regression', async ({ page }) => {
  await page.goto('http://localhost:9000/iframe.html?viewMode=story&id=4d1b4185-e04d-494a-ab38-2b56c1778b0b--default', {
    waitUntil: 'networkidle',
  });

  // Optional: Add a small buffer in case hydration needs more time
  await page.waitForTimeout(1000);

  const accordion = page.locator('post-accordion').first();

  // Disable animations for consistent screenshots
  await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });

  // Ensure all fonts are loaded before taking screenshot
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  await expect(accordion).toBeVisible({ timeout: 10000 });

  await expect(accordion).toHaveScreenshot('accordion.png', {
    animations: 'disabled',
    timeout: 10000,
    maxDiffPixelRatio: 0.01, // Allow a very slight rendering diff
  });
});
