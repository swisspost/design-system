import { buildLoginParameters, changeCompanyURL, join, loginURL, logoutURL } from '../urls';

describe('join', () => {
  it('returns the base untouched when there is nothing to append', () => {
    expect(join('https://example.post.ch/login')).toBe('https://example.post.ch/login');
  });

  it('opens the query string when the base has none', () => {
    expect(join('https://example.post.ch/login', 'app=x')).toBe(
      'https://example.post.ch/login?app=x',
    );
  });

  it('continues the query string when the base already has one', () => {
    expect(join('https://example.post.ch/login?next=%2F', 'app=x')).toBe(
      'https://example.post.ch/login?next=%2F&app=x',
    );
  });
});

describe('buildLoginParameters', () => {
  it('joins every parameter the url does not already mention', () => {
    expect(
      buildLoginParameters('https://example.ch/login', { app: 'klp', service: 'sso', lang: 'de' }),
    ).toBe('app=klp&service=sso&lang=de');
  });

  it('returns undefined rather than an empty string when nothing is left', () => {
    expect(
      buildLoginParameters('https://example.ch/login?app=sso', { app: 'klp' }),
    ).toBeUndefined();
  });

  // Was a v9 defect: the check was a substring match against the whole url, so any host or path
  // containing a parameter name silently dropped it.
  it('keeps a parameter whose name only occurs in the host or path', () => {
    expect(
      buildLoginParameters('https://applications.post.ch/login', { app: 'klp', lang: 'de' }),
    ).toBe('app=klp&lang=de');
  });

  it('skips a parameter the query already carries', () => {
    expect(
      buildLoginParameters('https://example.ch/login?app=sso&next=%2F', {
        app: 'klp',
        lang: 'de',
      }),
    ).toBe('lang=de');
  });

  it('matches parameter names case insensitively', () => {
    expect(
      buildLoginParameters('https://example.ch/login?APP=sso', { app: 'klp' }),
    ).toBeUndefined();
  });

  it('ignores a fragment that looks like a query', () => {
    expect(buildLoginParameters('https://example.ch/login#app=sso', { app: 'klp' })).toBe(
      'app=klp',
    );
  });
});

describe('loginURL', () => {
  it('appends the parameters the app login url is missing', () => {
    expect(loginURL('https://example.ch/login', { app: 'klp', service: 'sso', lang: 'de' })).toBe(
      'https://example.ch/login?app=klp&service=sso&lang=de',
    );
  });
});

describe('logoutURL', () => {
  it('always logs out of the klp service and never from an iframe', () => {
    expect(
      logoutURL('https://int.post.ch/logout', { app: 'klp', lang: 'de', logoutTargetURL: '' }),
    ).toBe(
      'https://int.post.ch/logout?app=klp&lang=de&service=klp&inIframe=false&logoutTargetURL=',
    );
  });
});

describe('changeCompanyURL', () => {
  it('is the logout url flagged as a company change', () => {
    const params = { app: 'klp', lang: 'de', logoutTargetURL: 'https://int.post.ch/' };

    expect(changeCompanyURL('https://int.post.ch/logout', params)).toBe(
      `${logoutURL('https://int.post.ch/logout', params)}&changecompany=true`,
    );
  });
});
