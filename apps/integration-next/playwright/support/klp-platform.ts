import { Page } from '@playwright/test';

/**
 * The login widget opens a session against a real KLP platform as soon as it upgrades, which keeps
 * the page from ever reaching `networkidle`. Anonymous is the state these tests assert anyway.
 */
export function blockKlpPlatform(page: Page) {
  return page.route('**/n.account*.post.ch/**', route => route.abort());
}
