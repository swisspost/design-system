import * as testConfig from '@/assets/config/test-configuration.json';
import { state } from '@/data/store';
import { MainNavigationConfig } from '@/models/header.model';
import { IconLinkConfig } from '@/models/shared.model';
import { compareRoutes, getActiveLink, getSimilarityScore } from './route.service';

describe('route.service.ts', () => {
  describe('getSimilarityScore', () => {
    it('Computes the correct score', () => {
      const score = getSimilarityScore(['a', 'b'], ['a', 'b', 'e']);
      expect(score).toBe(2);
    });

    it('Returns infinite on an exact match', () => {
      const score = getSimilarityScore(['a'], ['a']);
      expect(score).toBe(1);
    });

    it('Returns 0 when nothing matches', () => {
      const scores = [
        getSimilarityScore(['a'], ['b']),
        getSimilarityScore(['a', 'c'], ['b', 'c']),
        getSimilarityScore([], ['a']),
        getSimilarityScore(['a'], []),
        // @ts-expect-error first arguments should be of type "string"
        getSimilarityScore(null, ['a']),
        // @ts-expect-error first arguments should be of type "string"
        getSimilarityScore(undefined, ['a']),
        getSimilarityScore([], []),
        getSimilarityScore(
          ['https://post.ch', 'wherever123'],
          ['https://post.ch', 'de', 'kundencenter', 'kundencenter'],
        ),
      ];

      expect(
        getSimilarityScore(
          ['https://post.ch', 'wherever123'],
          ['https://post.ch', 'de', 'kundencenter', 'kundencenter'],
        ),
      ).toBe(0);

      for (const score of scores) {
        expect(score).toBe(0);
      }
    });
  });

  describe('compareRoutes', () => {
    const post = new URL('https://post.ch');
    const letters = new URL('https://post.ch/briefe');
    const deep = new URL('https://post.ch/briefe/inland');
    const search = new URL('https://post.ch/briefe?q=search');
    const hash = new URL('https://post.ch/briefe#hash');
    const nope = new URL('https://post.de/briefe');
    const upper = new URL('https://post.ch/Briefe');

    it('Correctly scores routes in auto mode', () => {
      // Left: current browser URL, right: URL in Nav
      expect(compareRoutes(letters, post, 'auto')).toBe(1);
      expect(compareRoutes(deep, letters, 'auto')).toBe(2);
      expect(compareRoutes(search, letters, 'auto')).toBe(Infinity);
      expect(compareRoutes(search, hash, 'auto')).toBe(Infinity);
      expect(compareRoutes(letters, deep, 'auto')).toBe(0);
      expect(compareRoutes(nope, letters, 'auto')).toBe(0);
      expect(compareRoutes(letters, upper, 'auto')).toBe(Infinity);
      expect(compareRoutes(deep, upper, 'auto')).toBe(2);
    });

    it('Correctly scores routes in exact mode', () => {
      // Left: current browser URL, right: URL in Nav
      expect(compareRoutes(post, letters)).toBe(0);
      expect(compareRoutes(letters, deep)).toBe(0);
      expect(compareRoutes(letters, search)).toBe(Infinity);
      expect(compareRoutes(hash, search)).toBe(Infinity);
      expect(compareRoutes(deep, letters)).toBe(0);
      expect(compareRoutes(letters, nope)).toBe(0);
      expect(compareRoutes(nope, letters)).toBe(0);
      expect(compareRoutes(letters, nope, 'exact')).toBe(0);
      expect(compareRoutes(letters, upper, 'exact')).toBe(Infinity);
    });

    it('Does not fail on invalid arguments', () => {
      // @ts-expect-error first arguments should be of type url
      expect(compareRoutes(null, nope, 'auto')).toBe(0);
      // @ts-expect-error first and second arguments should be of type url
      expect(compareRoutes(null, undefined, 'auto')).toBe(0);
      // @ts-expect-error third argument should be of type 'auto' or 'exact'
      expect(compareRoutes(post, nope, null)).toBe(0);
    });
  });

  describe('getActiveLink', () => {
    beforeEach(() => {
      const config = [...testConfig.de.header.localHeader.mainNavigation] as MainNavigationConfig;
      state.localizedConfig = {
        header: {
          ...testConfig.de.header,
          localHeader: { ...testConfig.de.header.localHeader, mainNavigation: config },
        },
      };
    });

    afterEach(() => {
      state.localizedConfig = null;
    });

    it('Returns null when activeRouteProp is "none"', () => {
      expect(getActiveLink('none')).toBeNull();
    });

    it('Returns the matching link for an exact match', () => {
      const result = getActiveLink(`${document.location.origin}/letters`);
      expect(result?.url).toBe('/letters');
    });

    it('Returns the matching link for an auto partial match', () => {
      const result = getActiveLink(`${document.location.origin}/letters/sub-page`);
      expect(result?.url).toBe('/letters');
    });

    it('Returns null when no match is found', () => {
      const result = getActiveLink(`${document.location.origin}/nonexistent-page`);
      expect(result).toBeNull();
    });

    it('Returns null for an invalid URL', () => {
      const result = getActiveLink('https://[invalid');
      expect(result).toBeNull();
    });

    it('Returns null when localizedConfig is not set', () => {
      state.localizedConfig = null;
      expect(getActiveLink('auto')).toBeNull();
    });

    it('Returns portal-active link when activeRouteProp is "auto" and a link has active: true', () => {
      const activeLink = { text: 'Active Link', url: '/active-link', active: true };
      state.localizedConfig = {
        header: {
          ...testConfig.de.header,
          globalHeader: {
            ...testConfig.de.header.globalHeader,
            audience: testConfig.de.header.globalHeader.audience.map(link => ({
              ...link,
              active: false,
            })),
            languages: testConfig.de.header.globalHeader.languages.map(language => ({
              ...language,
              active: false,
            })),
          },
          localHeader: {
            mainNavigation: [activeLink, { text: 'Other Link', url: '/other' }],
          },
        },
      };
      const result = getActiveLink('auto');
      expect(result).toBe(activeLink);
    });

    it('Returns only one specific link object even when multiple links share the same URL', () => {
      const link1 = { text: 'First', url: '/sch' };
      const link2 = { text: 'Second', url: '/sch' };
      state.localizedConfig = {
        header: {
          ...testConfig.de.header,
          localHeader: {
            mainNavigation: [link1, link2],
          },
        },
      };
      const result = getActiveLink(`${document.location.origin}/sch`);
      expect(result).toBe(link1);
      expect(result).not.toBe(link2);
    });

    it('Returns a match from localHeader.navigation', () => {
      const localAction: IconLinkConfig = { text: 'Search', url: '/search', icon: 'search' };
      state.localizedConfig = {
        header: {
          ...testConfig.de.header,
          localHeader: {
            ...testConfig.de.header.localHeader,
            navigation: [localAction],
          },
        },
      };

      const result = getActiveLink(`${document.location.origin}/search`);
      expect(result).toBe(localAction);
    });

    it('Returns a match from globalHeader.secondaryNavigation', () => {
      const secondaryLink: IconLinkConfig = { text: 'Jobs', url: '/jobs', icon: 'jobs' };
      state.localizedConfig = {
        header: {
          ...testConfig.de.header,
          globalHeader: {
            ...testConfig.de.header.globalHeader,
            secondaryNavigation: [secondaryLink],
          },
        },
      };

      const result = getActiveLink(`${document.location.origin}/jobs`);
      expect(result).toBe(secondaryLink);
    });

    it('Returns the first encountered link when duplicate URLs have the same score', () => {
      const mainNavigationLink = { text: 'Main', url: '/shared' };
      const secondaryLink: IconLinkConfig = { text: 'Secondary', url: '/shared', icon: 'jobs' };

      state.localizedConfig = {
        header: {
          ...testConfig.de.header,
          localHeader: {
            ...testConfig.de.header.localHeader,
            mainNavigation: [mainNavigationLink],
          },
          globalHeader: {
            ...testConfig.de.header.globalHeader,
            secondaryNavigation: [secondaryLink],
          },
        },
      };

      const result = getActiveLink(`${document.location.origin}/shared`);
      expect(result).toBe(secondaryLink);
      expect(result).not.toBe(mainNavigationLink);
    });

    it('Includes user-menu options in localHeader.navigation', () => {
      const optionLink = { text: 'Profile', url: '/profile', icon: 'profile' };

      state.localizedConfig = {
        header: {
          ...testConfig.de.header,
          localHeader: {
            ...testConfig.de.header.localHeader,
            navigation: [
              {
                user: {
                  name: 'Jane',
                  surname: 'Doe',
                  email: 'jane.doe@example.com',
                  userType: 'B2C',
                  changeUserAndProfile: 'notAvailable',
                },
                options: [optionLink],
              },
            ],
          },
        },
      };

      const result = getActiveLink(`${document.location.origin}/profile`);
      expect(result).toBe(optionLink);
    });
  });
});
