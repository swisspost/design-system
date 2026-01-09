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
 * Extract primary variant desktop tests
 */
function createPrimaryDesktopTests(
  variantName: string,
  breakpointName: string,
  config: VariantConfig
) {
  if (!isPrimaryVariant(variantName) || breakpointName !== 'desktop') return;

  if (config.hasMegadropdown) {
    test('megadropdown trigger hover', async ({ page }) => {
      await hoverMegadropdownTrigger(page, 'letters');
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-megadropdown-trigger-hover.png`);
    });

    test('megadropdown trigger focus', async ({ page }) => {
      await focusMegadropdownTrigger(page, 'letters');
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-megadropdown-trigger-focus.png`);
    });

    test('megadropdown opened', async ({ page }) => {
      await openMegadropdown(page, 'letters');
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-megadropdown-opened.png`);
      await closeMegadropdown(page, 'letters');
    });

    test('megadropdown item hover', async ({ page }) => {
      await openMegadropdown(page, 'letters');
      await hoverMegadropdownItem(page, 'letters', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-megadropdown-item-hover.png`);
      await closeMegadropdown(page, 'letters');
    });

    test('megadropdown item focus', async ({ page }) => {
      await openMegadropdown(page, 'letters');
      await focusMegadropdownItem(page, 'letters', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-megadropdown-item-focus.png`);
      await closeMegadropdown(page, 'letters');
    });
  }

  test('language menu trigger hover', async ({ page }) => {
    await hoverLanguageMenuTrigger(page);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-trigger-hover.png`);
  });

  test('language menu trigger focus', async ({ page }) => {
    await focusLanguageMenuTrigger(page);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-trigger-focus.png`);
  });

  test('language menu opened', async ({ page }) => {
    await openLanguageMenu(page);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-opened.png`);
    await closeLanguageMenu(page);
  });

  test('language menu item hover', async ({ page }) => {
    await openLanguageMenu(page);
    await hoverLanguageMenuItem(page, 'de', false);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-item-hover.png`);
    await closeLanguageMenu(page);
  });

  test('language menu item focus', async ({ page }) => {
    await openLanguageMenu(page);
    await focusLanguageMenuItem(page, 'de', false);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-item-focus.png`);
    await closeLanguageMenu(page);
  });

  if (config.hasGlobalLogin) {
    test('global login hover', async ({ page }) => {
      await hoverSlotItem(page, 'post-login', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-global-login-hover.png`);
    });

    test('global login focus', async ({ page }) => {
      await focusSlotItem(page, 'post-login', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-global-login-focus.png`);
    });
  }

  if (config.hasAudience) {
    test('audience hover', async ({ page }) => {
      await hoverSlotItem(page, 'audience', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-audience-hover.png`);
    });

    test('audience focus', async ({ page }) => {
      await focusSlotItem(page, 'audience', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-audience-focus.png`);
    });
  }

  if (config.hasGlobalNavSecondary) {
    test('global nav secondary hover', async ({ page }) => {
      await hoverSlotItem(page, 'global-nav-secondary', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-global-nav-secondary-hover.png`);
    });

    test('global nav secondary focus', async ({ page }) => {
      await focusSlotItem(page, 'global-nav-secondary', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-global-nav-secondary-focus.png`);
    });
  }

  if (config.hasLocalNavigation) {
    test('local nav hover', async ({ page }) => {
      await hoverSlotItem(page, 'local-nav', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-local-nav-hover.png`);
    });

    test('local nav focus', async ({ page }) => {
      await focusSlotItem(page, 'local-nav', 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-local-nav-focus.png`);
    });
  }

  if (config.hasMegadropdown) {
    test('main nav hover', async ({ page }) => {
      await hoverMainNavItem(page, 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-main-nav-hover.png`);
    });

    test('main nav focus', async ({ page }) => {
      await focusMainNavItem(page, 0);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-main-nav-focus.png`);
    });
  }
}

/**
 * Extract logged-in variant desktop tests
 */
function createLoggedInDesktopTests(
  variantName: string,
  breakpointName: string,
  config: VariantConfig
) {
  if (!isLoggedInVariant(variantName) || breakpointName !== 'desktop' || !config.hasUserMenu) return;

  test('user menu trigger hover', async ({ page }) => {
    await hoverUserMenuTrigger(page);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-user-menu-trigger-hover.png`);
  });

  test('user menu trigger focus', async ({ page }) => {
    await focusUserMenuTrigger(page);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-user-menu-trigger-focus.png`);
  });

  test('user menu opened', async ({ page }) => {
    await openUserMenu(page);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-user-menu-opened.png`);
    await closeUserMenu(page);
  });

  test('user menu item hover', async ({ page }) => {
    await openUserMenu(page);
    await hoverUserMenuItem(page, 0);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-user-menu-item-hover.png`);
    await closeUserMenu(page);
  });

  test('user menu item focus', async ({ page }) => {
    await openUserMenu(page);
    await focusUserMenuItem(page, 0);
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-user-menu-item-focus.png`);
    await closeUserMenu(page);
  });
}

/**
 * Extract mobile tests
 */
function createMobileTests(variantName: string, breakpointName: string, config: VariantConfig) {
  if (breakpointName !== 'mobile') return;

  if (isPrimaryVariant(variantName)) {
    test('burger menu hover', async ({ page }) => {
      await hoverBurgerMenu(page);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-burger-menu-hover.png`);
    });

    test('burger menu focus', async ({ page }) => {
      await focusBurgerMenu(page);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-burger-menu-focus.png`);
    });

    test('burger menu opened', async ({ page }) => {
      await openBurgerMenu(page);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-burger-menu-opened.png`);
      await closeBurgerMenu(page);
    });

    test('language menu list hover', async ({ page }) => {
      await hoverLanguageMenuItem(page, 'de', true);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-list-hover.png`);
    });

    test('language menu list focus', async ({ page }) => {
      await focusLanguageMenuItem(page, 'de', true);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-list-focus.png`);
    });

    test('language menu list active', async ({ page }) => {
      await focusLanguageMenuItem(page, 'en', true);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-language-menu-list-active.png`);
    });
  }

  if (isLoggedInVariant(variantName) && config.hasUserMenu) {
    test('mobile user menu in burger', async ({ page }) => {
      await openBurgerMenu(page);
      await openUserMenu(page);
      await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-user-menu-in-burger.png`);
      await closeUserMenu(page);
      await closeBurgerMenu(page);
    });
  }
}

/**
 * Extract tablet tests
 */
function createTabletTests(variantName: string, breakpointName: string) {
  if (breakpointName !== 'tablet') return;

  const testableVariants = ['portal-loggedout', 'jobs-loggedout', 'microsite-loggedout', 'onepager'];
  if (!testableVariants.includes(variantName)) return;

  test('responsive layout', async ({ page }) => {
    await expect(page).toHaveScreenshot(`${variantName}-${breakpointName}-layout.png`);
  });
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
          
          if (!response || response.status() >= 400) {
            console.error(`Failed loading post-header-${variantName}.html - Status: ${response?.status()}`);
            test.skip(true, `HTML file issue for ${variantName}`);
            return;
          }
          
          await waitForHeaderReady(page);
        });

        // CRITICAL TESTS - Always run for all variants
        test('default state', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${variantName}-${name}-default.png`);
        });

        test('keyboard navigation', async ({ page }) => {
          await testKeyboardNavigation(page, 3);
          await expect(page).toHaveScreenshot(`${variantName}-${name}-keyboard-nav.png`);
        });

        // Variant-specific tests
        createPrimaryDesktopTests(variantName, name, config);
        createLoggedInDesktopTests(variantName, name, config);
        createMobileTests(variantName, name, config);
        createTabletTests(variantName, name);
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
            await hoverSlotItem(page, 'global-nav-primary', 0);
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