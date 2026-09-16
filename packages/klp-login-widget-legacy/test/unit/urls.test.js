import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildLoginParameters,
  changeCompanyURL,
  join,
  loginURL,
  logoutURL,
} from '../../src/legacy/urls.js';

describe('join', () => {
  it('returns the base untouched when there is nothing to append', () => {
    assert.equal(join('https://example.post.ch/login', undefined), 'https://example.post.ch/login');
  });

  it('opens the query string when the base has none', () => {
    assert.equal(
      join('https://example.post.ch/login', 'app=x'),
      'https://example.post.ch/login?app=x',
    );
  });

  it('continues the query string when the base already has one', () => {
    assert.equal(
      join('https://example.post.ch/login?next=%2F', 'app=x'),
      'https://example.post.ch/login?next=%2F&app=x',
    );
  });
});

describe('buildLoginParameters', () => {
  it('joins every parameter the url does not already mention', () => {
    assert.equal(
      buildLoginParameters('https://example.ch/login', { app: 'klp', service: 'sso', lang: 'de' }),
      'app=klp&service=sso&lang=de',
    );
  });

  it('returns undefined rather than an empty string when nothing is left', () => {
    assert.equal(
      buildLoginParameters('https://example.ch/login?app=sso', { app: 'klp' }),
      undefined,
    );
  });

  // Was a v9 defect: the check was a substring match against the whole url, so any host or path
  // containing a parameter name silently dropped it.
  it('keeps a parameter whose name only occurs in the host or path', () => {
    assert.equal(
      buildLoginParameters('https://applications.post.ch/login', { app: 'klp', lang: 'de' }),
      'app=klp&lang=de',
    );
  });

  it('skips a parameter the query already carries', () => {
    assert.equal(
      buildLoginParameters('https://example.ch/login?app=sso&next=%2F', {
        app: 'klp',
        lang: 'de',
      }),
      'lang=de',
    );
  });

  it('matches parameter names case insensitively', () => {
    assert.equal(
      buildLoginParameters('https://example.ch/login?APP=sso', { app: 'klp' }),
      undefined,
    );
  });
});

describe('loginURL', () => {
  it('appends the parameters the app login url is missing', () => {
    assert.equal(
      loginURL('https://example.ch/login', { app: 'klp', service: 'sso', lang: 'de' }),
      'https://example.ch/login?app=klp&service=sso&lang=de',
    );
  });
});

describe('logoutURL', () => {
  it('always logs out of the klp service and never from an iframe', () => {
    assert.equal(
      logoutURL('https://int.post.ch/logout', { app: 'klp', lang: 'de', logoutTargetURL: '' }),
      'https://int.post.ch/logout?app=klp&lang=de&service=klp&inIframe=false&logoutTargetURL=',
    );
  });
});

describe('changeCompanyURL', () => {
  it('is the logout url flagged as a company change', () => {
    const params = { app: 'klp', lang: 'de', logoutTargetURL: 'https://int.post.ch/' };

    assert.equal(
      changeCompanyURL('https://int.post.ch/logout', params),
      logoutURL('https://int.post.ch/logout', params) + '&changecompany=true',
    );
  });
});
