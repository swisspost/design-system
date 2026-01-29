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

export type BreakpointName = typeof TEST_BREAKPOINTS[number]['name'];

/**
 * Handler type definitions
 */
export type HandlerFunction = (page: Page) => Promise<void>;
export type HandlerMap = Record<string, HandlerFunction>;

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

  'scrolled': async (page) => {
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

const LANGUAGE_AND_SCROLL = [
  'language-open',
  'scrolled',
] as const;

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
 * Helper for tablet + mobile duplication
 */
const tm = (states: readonly string[]) => ({
  tablet: { states },
  mobile: { states },
});

/**
 * Test configuration
 */
export const TEST_MATRIX: Record<string, VariantConfig> = {
  'portal-loggedout': {
    desktop: { states: DESKTOP_PORTAL_LOGGED_OUT },
    ...tm(BURGER_FLOW),
  },

  'portal-loggedin': {
    desktop: { states: LOGGED_IN },
    ...tm(LOGGED_IN),
  },

  'microsite-loggedout': {
    desktop: { states: DESKTOP_MICROSITE_LOGGED_OUT },
    ...tm(BURGER_FLOW),
  },

  'microsite-loggedin': {
    desktop: { states: LOGGED_IN },
    ...tm(LOGGED_IN),
  },

  'jobs-loggedout': {
    desktop: { states: SCROLLED_ONLY },
    ...tm(BURGER_FLOW_NO_SECOND),
  },

  'jobs-loggedin': {
    desktop: { states: LOGGED_IN },
    ...tm(LOGGED_IN),
  },

  'onepager': {
    desktop: { states: SCROLLED_ONLY },
    ...tm(LANGUAGE_AND_SCROLL),
  },
};
