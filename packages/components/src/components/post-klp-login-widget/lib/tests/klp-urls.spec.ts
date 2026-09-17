import { KLP_BASE_URLS, klpBaseUrl } from '../klp-urls';

describe('klp-urls', () => {
  it('maps every environment that has no platform of its own onto int01', () => {
    const int01 = KLP_BASE_URLS.int01;

    expect(KLP_BASE_URLS.dev01).toBe(int01);
    expect(KLP_BASE_URLS.dev02).toBe(int01);
    expect(KLP_BASE_URLS.devs1).toBe(int01);
    expect(KLP_BASE_URLS.test).toBe(int01);
  });

  it('keeps int02 and prod on their own hosts', () => {
    expect(KLP_BASE_URLS.int02).toBe('https://n.accountint2.post.ch');
    expect(KLP_BASE_URLS.prod).toBe('https://n.account.post.ch');
  });

  it('serves every base url over https', () => {
    for (const url of Object.values(KLP_BASE_URLS)) {
      expect(url.startsWith('https://')).toBe(true);
    }
  });

  it('refuses an unknown environment instead of falling back to prod', () => {
    expect(klpBaseUrl('int03')).toBeNull();
    expect(klpBaseUrl('')).toBeNull();
  });
});
