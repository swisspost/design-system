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
 * State handler configurations
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
 * Configuration interface
 */
interface BreakpointConfig {
  states: string[];
}

interface VariantConfig {
  desktop: BreakpointConfig;
  tablet: BreakpointConfig;
  mobile: BreakpointConfig;
}

/**
 * Test configuration - Using actual HTML filenames from generator
 */
export const TEST_MATRIX: Record<string, VariantConfig> = {
  'portal-loggedout': {
    desktop: {
      states: [
        'megadropdown-open',
        'language-open',
        'scrolled',
        'scrolled-megadropdown-open',
      ],
    },
    tablet: {
      states: [
        'first-level-opened',
        'second-level-opened',
        'scrolled',
        'scrolled-first-level-opened',
        'scrolled-second-level-opened',
      ],
    },
    mobile: {
      states: [
        'first-level-opened',
        'second-level-opened',
        'scrolled',
        'scrolled-first-level-opened',
        'scrolled-second-level-opened',
      ],
    },
  },
  'portal-loggedin': {
    desktop: {
      states: [
        'user-menu-open',
      ],
    },
    tablet: {
      states: [
        'user-menu-open',
      ],
    },
    mobile: {
      states: [
        'user-menu-open',
      ],
    },
  },
  'microsite-loggedout': {
    desktop: {
      states: [
        'megadropdown-open',
        'scrolled',
        'scrolled-megadropdown-open',
      ],
    },
    tablet: {
      states: [
        'first-level-opened',
        'second-level-opened',
        'scrolled',
        'scrolled-first-level-opened',
        'scrolled-second-level-opened',
      ],
    },
    mobile: {
      states: [
        'first-level-opened',
        'second-level-opened',
        'scrolled',
        'scrolled-first-level-opened',
        'scrolled-second-level-opened',
      ],
    },
  },
  'microsite-loggedin': {
    desktop: {
      states: [
        'user-menu-open',
      ],
    },
    tablet: {
      states: [
        'user-menu-open',

      ],
    },
    mobile: {
      states: [
        'user-menu-open',
      ],
    },
  },
  'jobs-loggedout': {
    desktop: {
      states: [
        'scrolled',
      ],
    },
    tablet: {
      states: [
        'first-level-opened',
        'scrolled',
        'scrolled-first-level-opened',
      ],
    },
    mobile: {
      states: [
        'first-level-opened',
        'scrolled',
        'scrolled-first-level-opened',
      ],
    },
  },
  'jobs-loggedin': {
    desktop: {
      states: [
        'user-menu-open',
      ],
    },
    tablet: {
      states: [
        'user-menu-open',
      ],
    },
    mobile: {
      states: [
        'user-menu-open',
      ],
    },
  },
  'onepager': {
    desktop: {
      states: [
        'scrolled',
      ],
    },
    tablet: {
      states: [
        'language-open',
        'scrolled',
      ],
    },
    mobile: {
      states: [
        'language-open',
        'scrolled',
      ],
    },
  },
};