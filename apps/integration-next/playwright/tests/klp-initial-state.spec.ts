import { expect, test } from '@playwright/test';

// The server picks the login widget's initial state from the URL (see `src/proxy.ts`), so the
// response HTML already tells whether the KLP platform mock will sign someone in.
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
    test(`should be server rendered as ${expected} for "/ssr${query}"`, async ({ request }) => {
      const html = await (await request.get(`/ssr${query}`)).text();

      expect(html).toMatch(new RegExp(`<post-klp-login-widget[^>]*initial-state="${expected}"`));
    });
  }

  test('should ignore an initial state header sent by the client', async ({ request }) => {
    const html = await (
      await request.get('/ssr', { headers: { 'x-klp-initial-state': 'authenticated' } })
    ).text();

    expect(html).toMatch(/<post-klp-login-widget[^>]*initial-state="anonymous"/);
  });
});
