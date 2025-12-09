import { expect, test, Page } from '@playwright/test';
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

async function waitForHeaderReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => {
    return (
      customElements.get('post-header') &&
      customElements.get('post-language-menu') &&
      customElements.get('post-megadropdown')
    );
  });
  await page.waitForTimeout(WAIT_TIMES.component);
}

test.describe('Post Header - Jobs Loggedin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visual-tests/components/post-header-jobs-loggedin.html');
    await waitForHeaderReady(page);
  });

  BREAKPOINTS.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(WAIT_TIMES.interaction);
      });

      // Default state
      test('default state', async ({ page }) => {
        await expect(page).toHaveScreenshot(`${name}-default.png`);
      });

      // Megadropdown tests
      test.describe('Megadropdown', () => {
        if (name === 'desktop') {
          test('letters trigger hover', async ({ page }) => {
            await hoverMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-hover.png`);
          });

          test('letters trigger focus', async ({ page }) => {
            await focusMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-focus.png`);
          });

          test('letters megadropdown opened', async ({ page }) => {
            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);

            await hoverMegadropdownItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-item-hover.png`);

            await focusMegadropdownItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-item-focus.png`);

            await closeMegadropdown(page);
          });

          test('packages megadropdown opened', async ({ page }) => {
            await openMegadropdown(page, 'packages');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-packages-opened.png`);
            await closeMegadropdown(page);
          });
        } else {
          test('megadropdown in burger menu', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-with-megadropdown.png`);

            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);
            await closeMegadropdown(page);
          });
        }
      });

      // Language menu tests
      test.describe('Language Menu', () => {
        if (name === 'desktop') {
          test('language menu opened', async ({ page }) => {
            await openLanguageMenu(page);
            await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
            await closeLanguageMenu(page);
          });
        } else {
          test('language menu in burger menu', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-language-menu.png`);
          });
        }
      });

      // Burger menu tests
      if (name !== 'desktop') {
        test.describe('Burger Menu', () => {
          test('burger menu opened', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-opened.png`);
            await closeBurgerMenu(page);
          });

          test('burger menu button hover', async ({ page }) => {
            await hoverBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-hover.png`);
          });

          test('burger menu button focus', async ({ page }) => {
            await focusBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-focus.png`);
          });
        });
      }

      // Target group tests
      test.describe('Target Group', () => {
        test('target group item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverSlotItem(page, 'target-group', 0);
          await expect(page).toHaveScreenshot(`${name}-target-group-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('target group item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusSlotItem(page, 'target-group', 0);
          await expect(page).toHaveScreenshot(`${name}-target-group-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Meta navigation tests
      test.describe('Meta Navigation', () => {
        test('meta navigation item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverSlotItem(page, 'meta-navigation', 0);
          await expect(page).toHaveScreenshot(`${name}-meta-nav-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('meta navigation item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusSlotItem(page, 'meta-navigation', 0);
          await expect(page).toHaveScreenshot(`${name}-meta-nav-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Local navigation tests
      test.describe('Local Navigation', () => {
        test('local navigation item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverSlotItem(page, 'local-nav', 0);
          await expect(page).toHaveScreenshot(`${name}-local-nav-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('local navigation item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusSlotItem(page, 'local-nav', 0);
          await expect(page).toHaveScreenshot(`${name}-local-nav-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Main navigation tests
      test.describe('Main Navigation', () => {
        test('main navigation item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverMainNavItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-main-nav-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('main navigation item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusMainNavItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-main-nav-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // User menu tests (loggedin only)
      test.describe('User Menu', () => {
        test('user menu trigger hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('user menu trigger focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('user menu opened', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await openUserMenu(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-opened.png`);
          await closeUserMenu(page);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('user menu item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await openUserMenu(page);
          await hoverUserMenuItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-user-menu-item-hover.png`);
          await closeUserMenu(page);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('user menu item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await openUserMenu(page);
          await focusUserMenuItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-user-menu-item-focus.png`);
          await closeUserMenu(page);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Keyboard navigation
      test('keyboard navigation', async ({ page }) => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(WAIT_TIMES.interaction);
        await expect(page).toHaveScreenshot(`${name}-keyboard-nav.png`);
      });
    });
  });
});
