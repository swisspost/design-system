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
 * Interaction handler configurations
 */
const HOVER_HANDLERS = {
  'audience': async (page) => hoverSlotItem(page, 'audience', 0),
  'global-controls': async (page) => hoverSlotItem(page, 'global-nav-primary', 0),
  'main-nav': async (page) => hoverMainNavItem(page, 0),
  'megadropdown-trigger': async (page) => hoverMegadropdownTrigger(page, 'letters'),
  'megadropdown-content': async (page) => {
    await openMegadropdown(page, 'letters');
    await hoverMegadropdownItem(page, 'letters', 0);
  },
  'language': async (page) => hoverLanguageMenuTrigger(page),
  'language-item': async (page) => {
    await openLanguageMenu(page);
    await hoverLanguageMenuItem(page, 0);
  },
  'local-nav': async (page) => hoverSlotItem(page, 'local-nav', 0),
  'user-menu': async (page) => hoverUserMenuTrigger(page),
  'user-menu-item': async (page) => {
    await openUserMenu(page);
    await hoverUserMenuItem(page, 0);
  },
  'burger': async (page) => hoverBurgerMenu(page),
};

const FOCUS_HANDLERS = {
  'audience': async (page) => focusSlotItem(page, 'audience', 0),
  'global-controls': async (page) => focusSlotItem(page, 'global-nav-primary', 0),
  'main-nav': async (page) => focusMainNavItem(page, 0),
  'megadropdown-trigger': async (page) => focusMegadropdownTrigger(page, 'letters'),
  'megadropdown-content': async (page) => {
    await openMegadropdown(page, 'letters');
    await focusMegadropdownItem(page, 'letters', 0);
  },
  'language': async (page) => focusLanguageMenuTrigger(page),
  'language-item': async (page) => {
    await openLanguageMenuAndFocusFirstItem(page);
    await focusLanguageMenuItem(page, 0);
  },
  'local-nav': async (page) => focusSlotItem(page, 'local-nav', 0),
  'user-menu': async (page) => focusUserMenuTrigger(page),
  'user-menu-item': async (page) => focusUserMenuItem(page),
  'burger': async (page) => focusBurgerMenu(page),
};

const STATE_HANDLERS = {
  'megadropdown-open': async (page) => openMegadropdown(page, 'letters'),
  'language-open': async (page) => openLanguageMenu(page),
  'user-menu-open': async (page) => openUserMenu(page),
  'burger-open': async (page) => openBurgerMenu(page),
  'burger-megadropdown-open': async (page) => {
    await openBurgerMenu(page);
    await openMegadropdown(page, 'letters');
  },
};

/**
 * Cleanup handlers for interactions that need closing
 */
const CLEANUP_HANDLERS = {
  'megadropdown-content': async (page) => closeMegadropdown(page, 'letters'),
  'language-item': async (page) => closeLanguageMenu(page),
  'megadropdown-open': async (page) => closeMegadropdown(page, 'letters'),
  'burger-megadropdown-open': async (page) => closeMegadropdown(page, 'letters'),
};

/**
 * Test configuration
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
    },
  },
};

/**
 * Generic test executor
 */
async function executeTest(
  page: any,
  interaction: string,
  variant: string,
  breakpoint: string,
  type: 'hover' | 'focus' | 'state'
) {
  const handlers = type === 'hover' ? HOVER_HANDLERS : type === 'focus' ? FOCUS_HANDLERS : STATE_HANDLERS;
  const handler = handlers[interaction];
  
  if (!handler) {
    throw new Error(`No ${type} handler found for interaction: ${interaction}`);
  }

  await handler(page);
  await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-${interaction}-${type}.png`);
  
  // Cleanup if needed
  const cleanup = CLEANUP_HANDLERS[interaction];
  if (cleanup) {
    await cleanup(page);
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

        // 1. Default state
        test('default', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${variant}-${breakpoint}-default.png`);
        });

        // 2. Open states
        config.states.forEach(state => {
          test(state, async ({ page }) => {
            await executeTest(page, state, variant, breakpoint, 'state');
          });
        });

        // 3. Hover states
        config.hover.forEach(interaction => {
          test(`${interaction} hover`, async ({ page }) => {
            await executeTest(page, interaction, variant, breakpoint, 'hover');
          });
        });

        // 4. Focus states
        config.focus.forEach(interaction => {
          test(`${interaction} focus`, async ({ page }) => {
            await executeTest(page, interaction, variant, breakpoint, 'focus');
          });
        });
      });
    });
  });
});