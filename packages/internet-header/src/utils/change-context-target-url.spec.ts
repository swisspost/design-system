import { changeContextTargetURL } from './change-context-target-url';

describe('changeContextTargetURL', () => {
  const href = 'https://www.post.ch/de/pages/some-page?foo=bar';

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: new URL(href),
      writable: true,
    });
  });

  // KLP reads this exact name; renaming it silently breaks the redirect back (issue #8674).
  it('names the parameter changeCompanyTargetURL', () => {
    const result = new URL(changeContextTargetURL('https://account.post.ch/switch'));

    expect(result.searchParams.get('changeCompanyTargetURL')).toBe(href);
  });

  it('keeps query params the target url already carries', () => {
    const result = new URL(changeContextTargetURL('https://account.post.ch/switch?lang=de'));

    expect(result.searchParams.get('lang')).toBe('de');
    expect(result.searchParams.get('changeCompanyTargetURL')).toBe(href);
  });

  it('overwrites a target url that already carries the parameter', () => {
    const result = new URL(
      changeContextTargetURL('https://account.post.ch/switch?changeCompanyTargetURL=https://old/'),
    );

    expect(result.searchParams.getAll('changeCompanyTargetURL')).toEqual([href]);
  });

  it('resolves a relative target url against the current page', () => {
    const result = new URL(changeContextTargetURL('/de/switch'));

    expect(result.origin).toBe('https://www.post.ch');
    expect(result.pathname).toBe('/de/switch');
  });
});
