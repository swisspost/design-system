import { test, expect } from '@playwright/test';

test.describe('Button Component Visual Test', () => {
  test('primary button appearance', async ({ page }) => {
    await page.goto('/tests/visual/components/button.html');
    
    await page.waitForTimeout(300);
    
    const button = page.locator('.btn-primary');
    await expect(button).toHaveScreenshot('button-primary.png');
    
    await button.hover();
    await expect(button).toHaveScreenshot('button-primary-hover.png');
    
    await button.focus();
    await expect(button).toHaveScreenshot('button-primary-focus.png');
    
    await page.mouse.down();
    await expect(button).toHaveScreenshot('button-primary-active.png');
    await page.mouse.up();
  });
});