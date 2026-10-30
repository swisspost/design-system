import { expect, test } from '@playwright/test';
import { blockKlpPlatform } from '../support/klp-platform';

// The app reads the login widget's initial state from the URL (see `src/app/klp-mock.ts`), so it
// already matches what the KLP platform mock will answer.
test.describe('KLP login widget initial state', () => {
  const cases = [
    { query: '', expected: 'anonymous' },
    { query: '?klpmock', expected: 'authenticated' },
    { query: '?KLPMOCK&Session=Grace', expected: 'authenticated' },
    { query: '?klpmock&session=grace', expected: 'authenticated' },
    { query: '?klpmock&session=nobody', expected: 'anonymous' },
    { query: '?session=ada', expected: 'anonymous' },
  ];

  for (const { query, expected } of cases) {
    test(`should start as ${expected} for "/home${query}"`, async ({ page }) => {
      await blockKlpPlatform(page);
      await page.goto(`/home${query}`);

      const initialState = await page
        .locator('post-klp-login-widget')
        .evaluate((widget: Element & { initialState?: string }) => widget.initialState);

      expect(initialState).toBe(expected);
    });
  }
});
