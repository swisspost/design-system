import { test, expect, Page } from '@playwright/test';

const BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 780, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
] as const;

const WAIT_TIMES = {
  component: 500,
  interaction: 200,
  animation: 500,
} as const;

async function waitForHeaderReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => {
    return customElements.get('post-header') && customElements.get('post-language-menu');
  });
  await page.waitForTimeout(WAIT_TIMES.component);
}

async function openLanguageMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const languageMenu = document.querySelector('post-language-menu');
    const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
    const button = trigger?.querySelector('button');
    button?.click();
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function focusLanguageMenuItem(page: Page, code: string): Promise<void> {
  await page.evaluate((langCode) => {
    const languageMenu = document.querySelector('post-language-menu');
    const item = Array.from(languageMenu?.querySelectorAll('post-language-menu-item') || [])
      .find(el => el.getAttribute('code') === langCode);
    
    if (item) {
      const element = item.querySelector('a, button') as HTMLElement;
      element?.focus();
    }
  }, code);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverLanguageMenuItem(page: Page, code: string): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);

  const coords = await page.evaluate((langCode) => {
    const languageMenu = document.querySelector('post-language-menu');
    const item = Array.from(languageMenu?.querySelectorAll('post-language-menu-item') || [])
      .find(el => el.getAttribute('code') === langCode);
    
    if (item) {
      const element = item.querySelector('a, button');
      if (element) {
        const rect = element.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    }
    return null;
  }, code);

  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

test.describe('Post Header - One Pager Variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visual-tests/components/post-header-onepager.html');
    await waitForHeaderReady(page);
  });

  BREAKPOINTS.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(WAIT_TIMES.interaction);
      });

      test('default state', async ({ page }) => {
        await expect(page).toHaveScreenshot(`${name}-default.png`);
      });

      // Desktop: Dropdown mode tests
      if (name === 'desktop') {
        test('language menu opened', async ({ page }) => {
          await openLanguageMenu(page);
          await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
        });

        test('language menu trigger hover', async ({ page }) => {
          const trigger = await page.evaluateHandle(() => {
            const languageMenu = document.querySelector('post-language-menu');
            const triggerEl = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
            return triggerEl?.querySelector('button');
          });
          
          await trigger.asElement()?.hover();
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-hover.png`);
        });

        test('language menu trigger focus', async ({ page }) => {
          await page.evaluate(() => {
            const languageMenu = document.querySelector('post-language-menu');
            const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
            const button = trigger?.querySelector('button') as HTMLButtonElement;
            button?.focus();
          });
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-focus.png`);
        });

        test('language menu item hover', async ({ page }) => {
          await openLanguageMenu(page);
          await hoverLanguageMenuItem(page, 'de');
          await expect(page).toHaveScreenshot(`${name}-language-menu-item-hover.png`);
        });

        test('language menu item focus', async ({ page }) => {
          await openLanguageMenu(page);
          await focusLanguageMenuItem(page, 'de');
          await expect(page).toHaveScreenshot(`${name}-language-menu-item-focus.png`);
        });
      }

      // Tablet & Mobile: List mode tests
      if (name !== 'desktop') {
        test('language menu item hover', async ({ page }) => {
          await hoverLanguageMenuItem(page, 'de');
          await expect(page).toHaveScreenshot(`${name}-language-menu-item-hover.png`);
        });

        test('language menu item focus', async ({ page }) => {
          await focusLanguageMenuItem(page, 'de');
          await expect(page).toHaveScreenshot(`${name}-language-menu-item-focus.png`);
        });
      }

      test('keyboard navigation', async ({ page }) => {
        await page.keyboard.press('Tab'); // Logo
        await page.keyboard.press('Tab'); // Language menu
        await page.waitForTimeout(WAIT_TIMES.interaction);
        await expect(page).toHaveScreenshot(`${name}-keyboard-nav.png`);
      });
    });
  });
});
