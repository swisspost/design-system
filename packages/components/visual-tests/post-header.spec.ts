import { test, expect } from '@playwright/test';

test.describe('Post Header Component Visual Tests - One Pager Variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visual-tests/components/post-header.html');
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => {
      return customElements.get('post-header') && 
             customElements.get('post-logo') &&
             customElements.get('post-language-menu') &&
             customElements.get('post-togglebutton');
    });

    await page.waitForTimeout(500);
  });

  const breakpoints = [
    { name: 'xs', width: 320, height: 568 },
    { name: 'sm', width: 576, height: 667 },
    { name: 'md', width: 768, height: 1024 },
    { name: 'lg', width: 992, height: 768 },
    { name: 'xl', width: 1200, height: 900 },
    { name: 'xxl', width: 1920, height: 1080 },
  ];

  breakpoints.forEach(({ name, width, height }) => {
    test.describe(`${name} breakpoint (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(300);
      });

      test('language switch closed', async ({ page }) => {
        await expect(page).toHaveScreenshot(`${name}-language-switch-closed.png`, {
          fullPage: false,
        });
      });

      test('language switch opened', async ({ page }) => {
        await page.evaluate(() => {
          const languageMenu = document.querySelector('post-language-menu');
          const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
          const button = trigger?.querySelector('button');
          button?.click();
        });
        await page.waitForTimeout(500);
        await expect(page).toHaveScreenshot(`${name}-language-switch-opened.png`, {
          fullPage: false,
        });
      });

      test('language switch hover state', async ({ page }) => {
        await page.evaluate(() => {
          const languageMenu = document.querySelector('post-language-menu');
          const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
          const button = trigger?.querySelector('button') as HTMLButtonElement;
          if (button) {
            // Add hover class to simulate hover state
            button.classList.add('hover');
            button.style.setProperty('background-color', 'var(--post-contrast-color-hover)', 'important');
          }
        });
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot(`${name}-language-switch-hover.png`, {
          fullPage: false,
        });
      });

      test('language switch focus state', async ({ page }) => {
        await page.evaluate(() => {
          const languageMenu = document.querySelector('post-language-menu');
          const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
          const button = trigger?.querySelector('button') as HTMLButtonElement;
          button?.focus();
        });
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot(`${name}-language-switch-focus.png`, {
          fullPage: false,
        });
      });

      test('language switch selected state', async ({ page }) => {
        await page.evaluate(() => {
          const languageMenu = document.querySelector('post-language-menu');
          const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
          const button = trigger?.querySelector('button');
          button?.click();
        });
        await page.waitForTimeout(500);
        
        // The selected state is the active language item
        await expect(page).toHaveScreenshot(`${name}-language-switch-selected.png`, {
          fullPage: false,
        });
      });
    });
  });
});
