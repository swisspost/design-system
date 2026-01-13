import { Page } from '@playwright/test';
import {
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
} from './header-test-helpers';

/**
 * Breakpoints for visual tests
 */
export const TEST_BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 780, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
] as const;

export type BreakpointName = typeof TEST_BREAKPOINTS[number]['name'];

/**
 * Handler type definitions
 */
export type HandlerFunction = (page: Page) => Promise<void>;
export type HandlerMap = Record<string, HandlerFunction>;

/**
 * Interaction handler configurations
 */
export const HOVER_HANDLERS: HandlerMap = {
  'audience': async (page: Page) => hoverSlotItem(page, 'audience', 0),
  'main-nav': async (page: Page) => hoverMainNavItem(page, 0),
  'megadropdown-trigger': async (page: Page) => hoverMegadropdownTrigger(page, 'letters'),
  'megadropdown-content': async (page: Page) => {
    await openMegadropdown(page, 'letters');
    await hoverMegadropdownItem(page, 'letters', 0);
  },
  'language': async (page: Page) => hoverLanguageMenuTrigger(page),
  'language-item': async (page: Page) => {
    await openLanguageMenu(page);
    await hoverLanguageMenuItem(page, 0);
  },
  'user-menu': async (page: Page) => hoverUserMenuTrigger(page),
  'user-menu-item': async (page: Page) => {
    await openUserMenu(page);
    await hoverUserMenuItem(page, 0);
  },
  'burger': async (page: Page) => hoverBurgerMenu(page),
};

export const FOCUS_HANDLERS: HandlerMap = {
  'audience': async (page: Page) => focusSlotItem(page, 'audience', 0),
  'main-nav': async (page: Page) => focusMainNavItem(page, 0),
  'megadropdown-trigger': async (page: Page) => focusMegadropdownTrigger(page, 'letters'),
  'megadropdown-content': async (page: Page) => {
    await openMegadropdown(page, 'letters');
    await focusMegadropdownItem(page, 'letters', 0);
  },
  'language': async (page: Page) => focusLanguageMenuTrigger(page),
  'language-item': async (page: Page) => {
    await openLanguageMenuAndFocusFirstItem(page);
    await focusLanguageMenuItem(page, 0);
  },
  'user-menu': async (page: Page) => focusUserMenuTrigger(page),
  'user-menu-item': async (page: Page) => focusUserMenuItem(page),
  'burger': async (page: Page) => focusBurgerMenu(page),
};

export const STATE_HANDLERS: HandlerMap = {
  'megadropdown-open': async (page: Page) => openMegadropdown(page, 'letters'),
  'language-open': async (page: Page) => openLanguageMenu(page),
  'user-menu-open': async (page: Page) => openUserMenu(page),
  'burger-open': async (page: Page) => openBurgerMenu(page),
  'burger-megadropdown-open': async (page: Page) => {
    await openBurgerMenu(page);
    await openMegadropdown(page, 'letters');
  },
  'scrolled': async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
  },
};

/**
 * Cleanup handlers for interactions that need closing
 */
export const CLEANUP_HANDLERS: HandlerMap = {
  'megadropdown-content': async (page: Page) => closeMegadropdown(page, 'letters'),
  'language-item': async (page: Page) => closeLanguageMenu(page),
  'megadropdown-open': async (page: Page) => closeMegadropdown(page, 'letters'),
  'burger-megadropdown-open': async (page: Page) => closeMegadropdown(page, 'letters'),
};

/**
 * Configuration interface
 */
interface BreakpointConfig {
  states: string[];
  hover: string[];
  focus: string[];
}

interface VariantConfig {
  desktop: BreakpointConfig;
  tablet: BreakpointConfig;
  mobile: BreakpointConfig;
}

/**
 * Common mobile/tablet configuration for burger menu states
 */
const MOBILE_TABLET_CONFIG: BreakpointConfig = {
  states: ['burger-open', 'burger-megadropdown-open'],
  hover: [],
  focus: [],
};

/**
 * Test configuration factory
 */
function createDesktopConfig(
  states: string[] = [],
  hover: string[] = [],
  focus: string[] = []
): BreakpointConfig {
  return {
    states: ['scrolled', ...states],
    hover,
    focus,
  };
}

/**
 * Test configuration
 * 
 * Strategy:
 * - All variants test their default state on all breakpoints (to catch header height/layout regressions)
 * - All variants test scrolled state on desktop (to catch sticky header behavior)
 * - Desktop interaction tests (hover/focus/states) only on portal-loggedout and portal-loggedin
 * - All variants test burger menu states on tablet and mobile (burger-open and burger-megadropdown-open)
 * - Burger hover/focus tests only on portal-loggedout tablet/mobile to avoid redundancy
 */
export const TEST_MATRIX: Record<string, VariantConfig> = {
  'portal-loggedout': {
    desktop: createDesktopConfig(
      ['megadropdown-open', 'language-open'],
      ['audience', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item'],
      ['audience', 'main-nav', 'megadropdown-trigger', 'megadropdown-content', 'language', 'language-item']
    ),
    tablet: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
    },
    mobile: {
      states: ['burger-open', 'burger-megadropdown-open'],
      hover: ['burger'],
      focus: ['burger'],
    },
  },
  'portal-loggedin': {
    desktop: createDesktopConfig(
      ['user-menu-open'],
      ['user-menu', 'user-menu-item'],
      ['user-menu', 'user-menu-item']
    ),
    tablet: MOBILE_TABLET_CONFIG,
    mobile: MOBILE_TABLET_CONFIG,
  },
  'jobs-loggedout': {
    desktop: createDesktopConfig(),
    tablet: MOBILE_TABLET_CONFIG,
    mobile: MOBILE_TABLET_CONFIG,
  },
  'jobs-loggedin': {
    desktop: createDesktopConfig(),
    tablet: MOBILE_TABLET_CONFIG,
    mobile: MOBILE_TABLET_CONFIG,
  },
  'microsite-loggedout': {
    desktop: createDesktopConfig(),
    tablet: MOBILE_TABLET_CONFIG,
    mobile: MOBILE_TABLET_CONFIG,
  },
  'microsite-loggedin': {
    desktop: createDesktopConfig(),
    tablet: MOBILE_TABLET_CONFIG,
    mobile: MOBILE_TABLET_CONFIG,
  },
  'onepager': {
    desktop: createDesktopConfig(),
    tablet: {
      states: [],
      hover: [],
      focus: [],
    },
    mobile: {
      states: [],
      hover: [],
      focus: [],
    },
  },
};