import { Page } from '@playwright/test';
import {
  openBurgerMenu,
  openMegadropdown,
  closeMegadropdown,
  openLanguageMenu,
  openUserMenu,
  scrollPageDown,
  scrollMainNavToEnd,
  hoverMegadropdownTitleLink,
  focusMegadropdownLink,
  scrollMegadropdownInner,
  focusLanguageListItem,
  openSideNav,
} from './header-test-helpers';

/**
 * Breakpoints for visual tests
 */
export const TEST_BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 780, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
] as const;

export type BreakpointName = (typeof TEST_BREAKPOINTS)[number]['name'];

/**
 * Handler type definitions
 */
export type HandlerMap = Record<string, (page: Page) => Promise<void>>;

/**
 * State handlers
 */
export const STATE_HANDLERS: HandlerMap = {
  'megadropdown-open': async (page: Page) => {
    await openMegadropdown(page, 'letters');
  },

  'language-open': async (page: Page) => {
    await openLanguageMenu(page);
  },

  'user-menu-open': async (page: Page) => {
    await openUserMenu(page);
  },

  'first-level-opened': async (page: Page) => {
    await openBurgerMenu(page);
  },

  'second-level-opened': async (page: Page) => {
    await openBurgerMenu(page);
    await openMegadropdown(page, 'letters');
  },

  'scrolled': async (page: Page) => {
    await scrollPageDown(page);
  },

  'scrolled-megadropdown-open': async (page: Page) => {
    await scrollPageDown(page);
    await openMegadropdown(page, 'letters');
  },

  'scrolled-first-level-opened': async (page: Page) => {
    await scrollPageDown(page);
    await openBurgerMenu(page);
  },

  'scrolled-second-level-opened': async (page: Page) => {
    await scrollPageDown(page);
    await openBurgerMenu(page);
    await openMegadropdown(page, 'letters');
  },

  'mainnav-overflow-scrolled': async (page: Page) => {
    await scrollMainNavToEnd(page);
  },

  'megadropdown-title-hover': async (page: Page) => {
    await openMegadropdown(page, 'letters');
    await hoverMegadropdownTitleLink(page, 'letters');
  },

  'megadropdown-link-focus': async (page: Page) => {
    await openMegadropdown(page, 'letters');
    await focusMegadropdownLink(page, 'letters');
  },

  'megadropdown-inner-scrolled': async (page: Page) => {
    await openBurgerMenu(page);
    await openMegadropdown(page, 'letters');
    await scrollMegadropdownInner(page, 'letters');
  },

  'language-list-focus': async (page: Page) => {
    await focusLanguageListItem(page);
  },

  'side-nav-open': async (page: Page) => {
    await openSideNav(page);
  },
};

/**
 * Cleanup handlers for interactions that need closing
 */
const closeLettersMegadropdown = (page: Page) => closeMegadropdown(page, 'letters');

export const CLEANUP_HANDLERS: HandlerMap = {
  'megadropdown-open': closeLettersMegadropdown,
  'second-level-opened': closeLettersMegadropdown,
  'scrolled-megadropdown-open': closeLettersMegadropdown,
  'scrolled-second-level-opened': closeLettersMegadropdown,
  'megadropdown-title-hover': closeLettersMegadropdown,
  'megadropdown-link-focus': closeLettersMegadropdown,
  'megadropdown-inner-scrolled': closeLettersMegadropdown,
};

/**
 * Configuration interfaces
 */
interface BreakpointConfig {
  states: readonly string[];
}

interface VariantConfig {
  desktop: BreakpointConfig;
  tablet: BreakpointConfig;
  mobile: BreakpointConfig;
}

/**
 * Shared state groups
 */
const LOGGED_IN = ['user-menu-open'] as const;

const SCROLLED_ONLY = ['scrolled'] as const;

const LANGUAGE_AND_SCROLL = ['language-open', 'scrolled'] as const;

const DESKTOP_PORTAL_LOGGED_OUT = [
  'megadropdown-open',
  'language-open',
  'scrolled',
  'scrolled-megadropdown-open',
] as const;

const DESKTOP_MICROSITE_LOGGED_OUT = [
  'megadropdown-open',
  'scrolled',
  'scrolled-megadropdown-open',
] as const;

const BURGER_FLOW = [
  'first-level-opened',
  'second-level-opened',
  'scrolled',
  'scrolled-first-level-opened',
  'scrolled-second-level-opened',
] as const;

const BURGER_FLOW_NO_SECOND = [
  'first-level-opened',
  'scrolled',
  'scrolled-first-level-opened',
] as const;

const OVERFLOW_DESKTOP = ['mainnav-overflow-scrolled'] as const;

const REGRESSION_DESKTOP = [
  'megadropdown-open',
  'megadropdown-title-hover',
  'megadropdown-link-focus',
] as const;

const REGRESSION_BURGER = ['second-level-opened', 'megadropdown-inner-scrolled'] as const;

const LANGUAGE_LIST = ['language-list-focus'] as const;

const SIDE_NAV = ['side-nav-open'] as const;

/**
 * Helper for composing state configurations across breakpoints
 */
const stateComposeHelper = (
  desktop: readonly string[],
  tablet?: readonly string[],
  mobile?: readonly string[],
) => ({
  desktop: { states: desktop },
  tablet: { states: tablet ?? desktop },
  mobile: { states: mobile ?? tablet ?? desktop },
});

/**
 * Test configuration
 */
export const TEST_MATRIX: Record<string, VariantConfig> = {
  'portal-loggedout': stateComposeHelper(DESKTOP_PORTAL_LOGGED_OUT, BURGER_FLOW),
  'portal-loggedin': stateComposeHelper(LOGGED_IN),
  'microsite-loggedout': stateComposeHelper(DESKTOP_MICROSITE_LOGGED_OUT, BURGER_FLOW),
  'microsite-loggedin': stateComposeHelper(LOGGED_IN),
  'jobs-loggedout': stateComposeHelper(SCROLLED_ONLY, BURGER_FLOW_NO_SECOND),
  'jobs-loggedin': stateComposeHelper(LOGGED_IN),
  'onepager': stateComposeHelper(SCROLLED_ONLY, LANGUAGE_AND_SCROLL),
  'application-compact': stateComposeHelper(SCROLLED_ONLY, LANGUAGE_AND_SCROLL),
  'application-condensed': stateComposeHelper(SCROLLED_ONLY, LANGUAGE_AND_SCROLL),
  'portal-overflow': stateComposeHelper(OVERFLOW_DESKTOP, [], []),
  'portal-regression': stateComposeHelper(REGRESSION_DESKTOP, REGRESSION_BURGER),
  'onepager-list': stateComposeHelper(LANGUAGE_LIST),
  'application-sidenav': stateComposeHelper([], SIDE_NAV),
  'slots-minimal': stateComposeHelper([]),
};
