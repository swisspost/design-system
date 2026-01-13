import { test, expect } from '@playwright/test';
import {
  BREAKPOINTS,
  waitForHeaderReady,
  openBurgerMenu,
  openMegadropdown,
  closeMegadropdown,
  openLanguageMenu,
  openLanguageMenuAndFocusFirstItem,
  closeLanguageMenu,
  openUserMenu,
  hoverMegadropdownTrigger,
  focusMegadropdownTrigger,
  hoverMegadropdownItem,
  focusMegadropdownItem,
  hoverLanguageMenuTrigger,
  focusLanguageMenuTrigger,
  hoverLanguageMenuItem,
  focusLanguageMenuItem,
  hoverUserMenuTrigger,
  focusUserMenuTrigger,
  hoverUserMenuItem,
  focusUserMenuItem,
  hoverSlotItem,
  focusSlotItem,
  hoverMainNavItem,
  focusMainNavItem,
  hoverBurgerMenu,
  focusBurgerMenu,
} from './helpers/header-test-helpers';

/**
 * Test configuration - hover and focus are separate arrays
 */
const TEST_MATRIX = {
  'portal-loggedout': {
    desktop: {
      states: ['megadropdown-open', 'language-open'],
      hover: ['audience', 'global-controls', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item'],
      focus: ['audience', 'global-controls', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item'],
    },
    mobile: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
      // No language tests - it's list mode (always visible, no interactions)
    },
  },
  'portal-loggedin': {
    desktop: {
      states: ['megadropdown-open', 'language-open', 'user-menu-open'],
      hover: ['audience', 'global-controls', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'user-menu', 'user-menu-item'],
      focus: ['audience', 'global-controls', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'user-menu', 'user-menu-item'],
    },
    mobile: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
    },
  },
  'jobs-loggedout': {
    desktop: {
      states: ['megadropdown-open', 'language-open'],
      hover: ['audience', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav'],
      focus: ['audience', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav'],
    },
    mobile: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
    },
  },
  'jobs-loggedin': {
    desktop: {
      states: ['megadropdown-open', 'language-open', 'user-menu-open'],
      hover: ['audience', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav', 'user-menu', 'user-menu-item'],
      focus: ['audience', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav', 'user-menu', 'user-menu-item'],
    },
    mobile: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
    },
  },
  'microsite-loggedout': {
    desktop: {
      states: ['megadropdown-open', 'language-open'],
      hover: ['main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav'],
      focus: ['main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav'],
    },
    mobile: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
    },
  },
  'microsite-loggedin': {
    desktop: {
      states: ['megadropdown-open', 'language-open', 'user-menu-open'],
      hover: ['main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav', 'user-menu', 'user-menu-item'],
      focus: ['main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item', 'local-nav', 'user-menu', 'user-menu-item'],
    },
    mobile: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
    },
  },
  'onepager': {
    desktop: {
      states: ['language-open'],
      hover: ['language'],
      focus: ['language'],
    },
    mobile: {
      states: [],
      hover: [],
      focus: [],
      // No megadropdown in onepager, language is list mode
    },
  },
};

/**
 * Helper to test ONLY hover state (no focus)
 */
async function testHover(page, interaction: string, variant: string, breakpoint: string) {
  switch (interaction) {
    case 'audience':
      await hoverSlotItem(page, 'audience', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-audience-hover.png`);
      break;
      
    case 'global-controls':
      await hoverSlotItem(page, 'global-nav-primary', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-global-controls-hover.png`);
      break;
      
    case 'main-nav':
      await hoverMainNavItem(page, 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-main-nav-hover.png`);
      break;
      
    case 'megadropdown-trigger':
      await hoverMegadropdownTrigger(page, 'letters');
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-megadropdown-trigger-hover.png`);
      break;
      
    case 'megadropdown-content':
      await openMegadropdown(page, 'letters');
      await hoverMegadropdownItem(page, 'letters', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-megadropdown-content-item-hover.png`);
      await closeMegadropdown(page, 'letters');
      break;
      
    case 'language':
      await hoverLanguageMenuTrigger(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-language-hover.png`);
      break;
      
    case 'language-item':
      await openLanguageMenu(page);
      await hoverLanguageMenuItem(page, 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-language-item-hover.png`);
      await closeLanguageMenu(page);
      break;
      
    case 'local-nav':
      await hoverSlotItem(page, 'local-nav', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-local-nav-hover.png`);
      break;
      
    case 'user-menu':
      await hoverUserMenuTrigger(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-user-menu-hover.png`);
      break;
      
    case 'user-menu-item':
      await openUserMenu(page);
      await hoverUserMenuItem(page, 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-user-menu-item-hover.png`);
      break;
      
    case 'burger':
      await hoverBurgerMenu(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-burger-hover.png`);
      break;
  }
}

/**
 * Helper to test ONLY focus state (no hover)
 */
async function testFocus(page, interaction: string, variant: string, breakpoint: string) {
  switch (interaction) {
    case 'audience':
      await focusSlotItem(page, 'audience', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-audience-focus.png`);
      break;
      
    case 'global-controls':
      await focusSlotItem(page, 'global-nav-primary', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-global-controls-focus.png`);
      break;
      
    case 'main-nav':
      await focusMainNavItem(page, 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-main-nav-focus.png`);
      break;
      
    case 'megadropdown-trigger':
      await focusMegadropdownTrigger(page, 'letters');
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-megadropdown-trigger-focus.png`);
      break;
      
    case 'megadropdown-content':
      await openMegadropdown(page, 'letters');
      await focusMegadropdownItem(page, 'letters', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-megadropdown-content-item-focus.png`);
      await closeMegadropdown(page, 'letters');
      break;
      
    case 'language':
      await focusLanguageMenuTrigger(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-language-focus.png`);
      break;
      
    case 'language-item':
      // Step 1: Open language menu (focus moves to next element)
      await openLanguageMenuAndFocusFirstItem(page);
      // Step 2: Tab into menu and navigate to desired item
      await focusLanguageMenuItem(page, 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-language-item-focus.png`);
      await closeLanguageMenu(page);
      break;
      
    case 'local-nav':
      await focusSlotItem(page, 'local-nav', 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-local-nav-focus.png`);
      break;
      
    case 'user-menu':
      await focusUserMenuTrigger(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-user-menu-focus.png`);
      break;
      
    case 'user-menu-item':
      await openUserMenu(page);
      await focusUserMenuItem(page, 0);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-user-menu-item-focus.png`);
      break;
      
    case 'burger':
      await focusBurgerMenu(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-burger-focus.png`);
      break;
  }
}

/**
 * Helper to test open states
 */
async function testState(page, state: string, variant: string, breakpoint: string) {
  switch (state) {
    case 'megadropdown-open':
      await openMegadropdown(page, 'letters');
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-megadropdown-open.png`);
      await closeMegadropdown(page, 'letters');
      break;
      
    case 'language-open':
      await openLanguageMenu(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-language-open.png`);
      break;
      
    case 'user-menu-open':
      await openUserMenu(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-user-menu-open.png`);
      break;
      
    case 'burger-open':
      await openBurgerMenu(page);
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-burger-open.png`);
      break;
      
    case 'burger-megadropdown-open':
      // On mobile: open burger menu first, then open megadropdown inside it
      await openBurgerMenu(page);
      await openMegadropdown(page, 'letters');
      await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-burger-megadropdown-open.png`);
      await closeMegadropdown(page, 'letters');
      break;
  }
}

/**
 * Main test suite
 */
Object.entries(TEST_MATRIX).forEach(([variant, breakpointConfig]) => {
  test.describe(`Header: ${variant}`, () => {
    
    BREAKPOINTS.forEach(({ name: breakpoint, width, height }) => {
      const config = breakpoint === 'desktop' ? breakpointConfig.desktop : breakpointConfig.mobile;
      
      test.describe(`${breakpoint} (${width}x${height})`, () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width, height });
          await page.goto(`/visual-tests/post-header-${variant}.html`);
          await waitForHeaderReady(page);
        });

        // 1. Default state (always test)
        test('default', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-default.png`);
        });

        // 2. Open states
        config.states.forEach(state => {
          test(state, async ({ page }) => {
            await testState(page, state, variant, breakpoint);
          });
        });

        // 3. Hover states (completely separate tests)
        config.hover.forEach(interaction => {
          test(`${interaction} hover`, async ({ page }) => {
            await testHover(page, interaction, variant, breakpoint);
          });
        });

        // 4. Focus states (completely separate tests)
        config.focus.forEach(interaction => {
          test(`${interaction} focus`, async ({ page }) => {
            await testFocus(page, interaction, variant, breakpoint);
          });
        });
      });
    });
  });
});