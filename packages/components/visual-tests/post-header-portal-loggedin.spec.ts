import { expect, test } from '@playwright/test';
import {
  BREAKPOINTS,
  WAIT_TIMES,
  openMegadropdown,
  closeMegadropdown,
  hoverMegadropdownTrigger,
  focusMegadropdownTrigger,
  hoverMegadropdownItem,
  focusMegadropdownItem,
  openLanguageMenu,
  closeLanguageMenu,
  openBurgerMenu,
  closeBurgerMenu,
  focusBurgerMenu,
  hoverBurgerMenu,
  hoverSlotItem,
  focusSlotItem,
  hoverMainNavItem,
  focusMainNavItem,
  openUserMenu,
  closeUserMenu,
  hoverUserMenuTrigger,
  focusUserMenuTrigger,
  hoverUserMenuItem,
  focusUserMenuItem,
} from './helpers/post-header-helpers';

// Test suites
BREAKPOINTS.forEach(({ name, width, height }) => {
  test.describe(`Post Header Portal Loggedin - ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/visual-tests/components/post-header-portal-loggedin.html');
      await page.waitForTimeout(WAIT_TIMES.component);
    });

    // Megadropdown tests
    test.describe('Megadropdown - Letters', () => {
      if (name === 'desktop') {
        test('letters megadropdown - hover trigger', async ({ page }) => {
          await hoverMegadropdownTrigger(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-hover.png`);
        });

        test('letters megadropdown - focus trigger', async ({ page }) => {
          await focusMegadropdownTrigger(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-focus.png`);
        });

        test('letters megadropdown - opened with item hover, focus, and active', async ({ page }) => {
          await openMegadropdown(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);

          await hoverMegadropdownItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-item-hover.png`);

          await focusMegadropdownItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-item-focus.png`);

          await closeMegadropdown(page);
        });
      } else {
        test('letters megadropdown - trigger (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-trigger.png`);
          await closeBurgerMenu(page);
        });

        test('letters megadropdown - opened (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await openMegadropdown(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);
          await closeMegadropdown(page);
        });
      }
    });

    // Language menu tests
    test.describe('Language Menu', () => {
      if (name === 'desktop') {
        test('language menu - default closed', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${name}-language-menu-closed.png`);
        });

        test('language menu - hover trigger', async ({ page }) => {
          await page.evaluate(() => {
            const menu = document.querySelector<any>('post-language-menu');
            const button = (menu?.shadowRoot as any)?.querySelector('button');
            const rect = button?.getBoundingClientRect();
            if (rect) {
              document.dispatchEvent(
                new MouseEvent('mousemove', {
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2,
                  bubbles: true,
                })
              );
            }
          });
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-hover.png`);
        });

        test('language menu - focus trigger', async ({ page }) => {
          await page.evaluate(() => {
            const menu = document.querySelector<any>('post-language-menu');
            const button = (menu?.shadowRoot as any)?.querySelector('button');
            button?.focus();
          });
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-focus.png`);
        });

        test('language menu - opened', async ({ page }) => {
          await openLanguageMenu(page);
          await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
          await closeLanguageMenu(page);
        });
      } else {
        test('language menu - trigger (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger.png`);
          await closeBurgerMenu(page);
        });

        test('language menu - opened (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await openLanguageMenu(page);
          await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
          await closeLanguageMenu(page);
        });
      }
    });

    // Burger menu tests
    test.describe('Burger Menu', () => {
      if (name !== 'desktop') {
        test('burger menu - closed default', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${name}-burger-menu-closed.png`);
        });

        test('burger menu - hover', async ({ page }) => {
          await hoverBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-burger-menu-hover.png`);
        });

        test('burger menu - focus', async ({ page }) => {
          await focusBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-burger-menu-focus.png`);
        });

        test('burger menu - opened', async ({ page }) => {
          await openBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-burger-menu-opened.png`);
          await closeBurgerMenu(page);
        });
      }
    });

    // Target Group tests
    test.describe('Target Group', () => {
      test('target group item hover', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await hoverSlotItem(page, 'target-group', 0);
        await expect(page).toHaveScreenshot(`${name}-target-group-item-hover.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });

      test('target group item focus', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await focusSlotItem(page, 'target-group', 0);
        await expect(page).toHaveScreenshot(`${name}-target-group-item-focus.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });
    });

    // Meta Navigation tests
    test.describe('Meta Navigation', () => {
      test('meta navigation item hover', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await hoverSlotItem(page, 'meta-navigation', 0);
        await expect(page).toHaveScreenshot(`${name}-meta-navigation-item-hover.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });

      test('meta navigation item focus', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await focusSlotItem(page, 'meta-navigation', 0);
        await expect(page).toHaveScreenshot(`${name}-meta-navigation-item-focus.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });
    });

    // User Menu tests (specific to loggedin variant)
    test.describe('User Menu', () => {
      if (name === 'desktop') {
        test('user menu trigger - default', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger.png`);
        });

        test('user menu trigger - hover', async ({ page }) => {
          await hoverUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-hover.png`);
        });

        test('user menu trigger - focus', async ({ page }) => {
          await focusUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-focus.png`);
        });

        test('user menu - opened with item hover/focus', async ({ page }) => {
          await openUserMenu(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-opened.png`);

          await hoverUserMenuItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-user-menu-item-hover.png`);

          await focusUserMenuItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-user-menu-item-focus.png`);

          await closeUserMenu(page);
        });
      } else {
        test('user menu trigger - hover (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await hoverUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-hover.png`);
          await closeBurgerMenu(page);
        });

        test('user menu trigger - focus (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await focusUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-focus.png`);
          await closeBurgerMenu(page);
        });

        test('user menu - opened (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await openUserMenu(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-opened.png`);
          await closeUserMenu(page);
        });
      }
    });

    // Main Navigation tests
    test.describe('Main Navigation', () => {
      test('main navigation first item hover', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await hoverMainNavItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-main-navigation-item-hover.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });

      test('main navigation first item focus', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await focusMainNavItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-main-navigation-item-focus.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });
    });
  });
});
