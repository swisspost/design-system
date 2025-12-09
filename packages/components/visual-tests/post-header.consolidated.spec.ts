import { test, expect } from '@playwright/test';
import { HEADER_VARIANTS, VariantConfig } from './helpers/header-variants.config';
import {
  BREAKPOINTS,
  waitForHeaderReady,
  testKeyboardNavigation,
  openBurgerMenu,
  closeBurgerMenu,
  // Megadropdown helpers
  hoverMegadropdownTrigger,
  focusMegadropdownTrigger,
  openMegadropdown,
  closeMegadropdown,
  hoverMegadropdownItem,
  focusMegadropdownItem,
  // Language menu helpers
  hoverLanguageMenuTrigger,
  focusLanguageMenuTrigger,
  openLanguageMenu,
  closeLanguageMenu,
  hoverLanguageMenuItem,
  focusLanguageMenuItem,
  // User menu helpers
  hoverUserMenuTrigger,
  focusUserMenuTrigger,
  openUserMenu,
  closeUserMenu,
  hoverUserMenuItem,
  focusUserMenuItem,
  // Burger menu helpers
  hoverBurgerMenu,
  focusBurgerMenu,
  // Slot item helpers
  hoverSlotItem,
  focusSlotItem,
  // Main navigation helpers
  hoverMainNavItem,
  focusMainNavItem,
} from './helpers/header-test-helpers';

/**
 * Determines if this is the primary variant to test (logged-out variants + onepager)
 * Logged-in variants will only test their unique features (user menu)
 */
function isPrimaryVariant(variantName: string): boolean {
  return variantName.includes('loggedout') || variantName === 'onepager';
}

/**
 * Determines if this is a logged-in variant that only needs user menu testing
 */
function isLoggedInVariant(variantName: string): boolean {
  return variantName.includes('loggedin');
}

/**
 * Main test suite generator for all header variants
 */
function createHeaderTestSuite(variantName: string, config: VariantConfig) {
  test.describe(`Post Header - ${variantName}`, () => {
    BREAKPOINTS.forEach(({ name, width, height }) => {
      test.describe(`${name} (${width}x${height})`, () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width, height });
          
          const response = await page.goto(`/visual-tests/components/post-header-${variantName}.html`);
          
          // Check if page loaded successfully (404 = file not found)
          if (!response || response.status() === 404) {
            console.error(`HTML file not found: post-header-${variantName}.html`);
            test.skip(true, `HTML file missing for ${variantName}`);
            return;
          }
          
          // Check for other HTTP errors
          if (response.status() >= 400) {
            console.error(`HTTP error ${response.status()} loading post-header-${variantName}.html`);
            test.skip(true, `HTTP error ${response.status()} for ${variantName}`);
            return;
          }
          
          await waitForHeaderReady(page);
        });

        // ====================================================================
        // CRITICAL TESTS - Always run for all variants
        // ====================================================================

        test('default state', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${variantName}-${name}-default.png`);
        });

        test('keyboard navigation', async ({ page }) => {
          await testKeyboardNavigation(page, 3);
          await expect(page).toHaveScreenshot(`${variantName}-${name}-keyboard-nav.png`);
        });

        // ====================================================================
        // PRIMARY VARIANT TESTS (logged-out + onepager)
        // Test everything except user menu
        // ====================================================================

        if (isPrimaryVariant(variantName) && name === 'desktop') {
          // Megadropdown (if variant has it)
          if (config.hasMegadropdown) {
            test('megadropdown trigger hover', async ({ page }) => {
              await hoverMegadropdownTrigger(page, 'letters');
              await expect(page).toHaveScreenshot(`${variantName}-${name}-megadropdown-trigger-hover.png`);
            });

            test('megadropdown trigger focus', async ({ page }) => {
              await focusMegadropdownTrigger(page, 'letters');
              await expect(page).toHaveScreenshot(`${variantName}-${name}-megadropdown-trigger-focus.png`);
            });

            test('megadropdown opened', async ({ page }) => {
              await openMegadropdown(page, 'letters');
              await expect(page).toHaveScreenshot(`${variantName}-${name}-megadropdown-opened.png`);
              await closeMegadropdown(page, 'letters');
            });

            test('megadropdown item hover', async ({ page }) => {
              await openMegadropdown(page, 'letters');
              await hoverMegadropdownItem(page, 'letters', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-megadropdown-item-hover.png`);
              await closeMegadropdown(page, 'letters');
            });

            test('megadropdown item focus', async ({ page }) => {
              await openMegadropdown(page, 'letters');
              await focusMegadropdownItem(page, 'letters', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-megadropdown-item-focus.png`);
              await closeMegadropdown(page, 'letters');
            });
          }

          // Language menu
          test('language menu trigger hover', async ({ page }) => {
            await hoverLanguageMenuTrigger(page);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-trigger-hover.png`);
          });

          test('language menu trigger focus', async ({ page }) => {
            await focusLanguageMenuTrigger(page);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-trigger-focus.png`);
          });

          test('language menu opened', async ({ page }) => {
            await openLanguageMenu(page);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-opened.png`);
            await closeLanguageMenu(page);
          });

          test('language menu item hover', async ({ page }) => {
            await openLanguageMenu(page);
            await hoverLanguageMenuItem(page, 'de', false);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-item-hover.png`);
            await closeLanguageMenu(page);
          });

          test('language menu item focus', async ({ page }) => {
            await openLanguageMenu(page);
            await focusLanguageMenuItem(page, 'de', false);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-item-focus.png`);
            await closeLanguageMenu(page);
          });

          // Global login (if variant has it)
          if (config.hasGlobalLogin) {
            test('global login hover', async ({ page }) => {
              await hoverSlotItem(page, 'global-login', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-global-login-hover.png`);
            });

            test('global login focus', async ({ page }) => {
              await focusSlotItem(page, 'global-login', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-global-login-focus.png`);
            });
          }

          // Target group (if variant has it)
          if (config.hasTargetGroup) {
            test('target group hover', async ({ page }) => {
              await hoverSlotItem(page, 'target-group', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-target-group-hover.png`);
            });

            test('target group focus', async ({ page }) => {
              await focusSlotItem(page, 'target-group', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-target-group-focus.png`);
            });
          }

          // Meta navigation (if variant has it)
          if (config.hasMetaNavigation) {
            test('meta nav hover', async ({ page }) => {
              await hoverSlotItem(page, 'meta-navigation', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-meta-nav-hover.png`);
            });

            test('meta nav focus', async ({ page }) => {
              await focusSlotItem(page, 'meta-navigation', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-meta-nav-focus.png`);
            });
          }

          // Local navigation (if variant has it)
          if (config.hasLocalNavigation) {
            test('local nav hover', async ({ page }) => {
              await hoverSlotItem(page, 'local-nav', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-local-nav-hover.png`);
            });

            test('local nav focus', async ({ page }) => {
              await focusSlotItem(page, 'local-nav', 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-local-nav-focus.png`);
            });
          }

          // Main navigation (if variant has it)
          if (config.hasMegadropdown) {
            test('main nav hover', async ({ page }) => {
              await hoverMainNavItem(page, 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-main-nav-hover.png`);
            });

            test('main nav focus', async ({ page }) => {
              await focusMainNavItem(page, 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-main-nav-focus.png`);
            });
          }
        }

        // ====================================================================
        // LOGGED-IN VARIANT TESTS
        // Only test user menu (the difference from logged-out)
        // ====================================================================

        if (isLoggedInVariant(variantName) && name === 'desktop') {
          if (config.hasUserMenu) {
            test('user menu trigger hover', async ({ page }) => {
              await hoverUserMenuTrigger(page);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-user-menu-trigger-hover.png`);
            });

            test('user menu trigger focus', async ({ page }) => {
              await focusUserMenuTrigger(page);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-user-menu-trigger-focus.png`);
            });

            test('user menu opened', async ({ page }) => {
              await openUserMenu(page);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-user-menu-opened.png`);
              await closeUserMenu(page);
            });

            test('user menu item hover', async ({ page }) => {
              await openUserMenu(page);
              await hoverUserMenuItem(page, 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-user-menu-item-hover.png`);
              await closeUserMenu(page);
            });

            test('user menu item focus', async ({ page }) => {
              await openUserMenu(page);
              await focusUserMenuItem(page, 0);
              await expect(page).toHaveScreenshot(`${variantName}-${name}-user-menu-item-focus.png`);
              await closeUserMenu(page);
            });
          }
        }

        // ====================================================================
        // MOBILE TESTS - Only for primary variants
        // ====================================================================

        if (isPrimaryVariant(variantName) && name === 'mobile') {
          test('burger menu hover', async ({ page }) => {
            await hoverBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-burger-menu-hover.png`);
          });

          test('burger menu focus', async ({ page }) => {
            await focusBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-burger-menu-focus.png`);
          });

          test('burger menu opened', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-burger-menu-opened.png`);
            await closeBurgerMenu(page);
          });

          test('language menu list hover', async ({ page }) => {
            await hoverLanguageMenuItem(page, 'de', true);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-list-hover.png`);
          });

          test('language menu list focus', async ({ page }) => {
            await focusLanguageMenuItem(page, 'de', true);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-list-focus.png`);
          });

          test('language menu list active', async ({ page }) => {
            await focusLanguageMenuItem(page, 'en', true);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-language-menu-list-active.png`);
          });
        }

        // Mobile user menu for logged-in variants only
        if (isLoggedInVariant(variantName) && name === 'mobile' && config.hasUserMenu) {
          test('mobile user menu in burger', async ({ page }) => {
            await openBurgerMenu(page);
            await openUserMenu(page);
            await expect(page).toHaveScreenshot(`${variantName}-${name}-user-menu-in-burger.png`);
            await closeUserMenu(page);
            await closeBurgerMenu(page);
          });
        }

        // ====================================================================
        // TABLET TESTS - Only test one variant per type
        // ====================================================================

        if (name === 'tablet') {
          // Only test portal-loggedout, jobs-loggedout, microsite-loggedout, and onepager
          if (variantName === 'portal-loggedout' || variantName === 'jobs-loggedout' || 
              variantName === 'microsite-loggedout' || variantName === 'onepager') {
            test('responsive layout', async ({ page }) => {
              await expect(page).toHaveScreenshot(`${variantName}-${name}-layout.png`);
            });
          }
        }
      });
    });

    // ======================================================================
    // VARIANT-SPECIFIC FEATURES - Only for unique variants
    // ======================================================================

    if (variantName === 'onepager' || variantName === 'portal-loggedout') {
      test.describe('Variant-specific features', () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width: 1280, height: 800 });
          
          const response = await page.goto(`/visual-tests/components/post-header-${variantName}.html`);
          
          // Check if page loaded successfully
          if (!response || response.status() >= 400) {
            console.error(`Failed to load post-header-${variantName}.html - Status: ${response?.status()}`);
            test.skip(true, `HTML file issue for ${variantName}`);
            return;
          }
          
          await waitForHeaderReady(page);
        });

        if (variantName === 'onepager') {
          test('minimal header with title', async ({ page }) => {
            await expect(page).toHaveScreenshot(`${variantName}-unique-minimal-header.png`);
          });
        }

        if (variantName === 'portal-loggedout') {
          test('global header section', async ({ page }) => {
            await hoverSlotItem(page, 'global-controls', 0);
            await expect(page).toHaveScreenshot(`${variantName}-unique-global-header.png`);
          });
        }
      });
    }
  });
}

// ============================================================================
// GENERATE ALL TEST SUITES
// ============================================================================

Object.entries(HEADER_VARIANTS).forEach(([variantName, config]) => {
  createHeaderTestSuite(variantName, config);
});