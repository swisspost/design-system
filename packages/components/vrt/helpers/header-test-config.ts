import { Page } from '@playwright/test';
import {
  openBurgerMenu,
  openMegadropdown,
  closeMegadropdown,
  openLanguageMenu,
  openUserMenu,
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

  scrolled: async page => {
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
  },

  'scrolled-megadropdown-open': async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
    await openMegadropdown(page, 'letters');
  },

  'scrolled-first-level-opened': async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
    await openBurgerMenu(page);
  },

  'scrolled-second-level-opened': async (page: Page) => {
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(300);
    await openBurgerMenu(page);
    await openMegadropdown(page, 'letters');
  },
};

/**
 * Cleanup handlers for interactions that need closing
 */
export const CLEANUP_HANDLERS: HandlerMap = {
  'megadropdown-open': async (page: Page) => {
    await closeMegadropdown(page, 'letters');
  },
  'second-level-opened': async (page: Page) => {
    await closeMegadropdown(page, 'letters');
  },
  'scrolled-megadropdown-open': async (page: Page) => {
    await closeMegadropdown(page, 'letters');
  },
  'scrolled-second-level-opened': async (page: Page) => {
    await closeMegadropdown(page, 'letters');
  },
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
  onepager: stateComposeHelper(SCROLLED_ONLY, LANGUAGE_AND_SCROLL),
};
