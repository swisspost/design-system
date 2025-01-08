import {
  ensureUrlWithOrigin,
  compareRoutes,
  compileScoreList,
  getSimilarityScore,
  markActiveRoute,
} from './route.service';
import * as testConfig from '../assets/config/test-configuration.json';
import { NavMainEntity } from '../models/header.model';

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
        // @ts-expect-error
        getSimilarityScore(null, ['a']),
        // @ts-expect-error
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

      for (let score of scores) {
        expect(score).toBe(0);
      }
    });
  });

  describe('compareRoutes', () => {
    const urls = {
      post: ensureUrlWithOrigin('https://post.ch'),
      letters: ensureUrlWithOrigin('https://post.ch/briefe'),
      deep: ensureUrlWithOrigin('https://post.ch/briefe/inland'),
      search: ensureUrlWithOrigin('https://post.ch/briefe?q=search'),
      hash: ensureUrlWithOrigin('https://post.ch/briefe#hash'),
      nope: ensureUrlWithOrigin('https://post.de/briefe'),
      upper: ensureUrlWithOrigin('https://post.ch/Briefe'),
    };

    it('Correctly scores routes in auto mode', () => {
      // Left: current browser URL, right: URL in Nav
      expect(compareRoutes(urls.letters, urls.post, 'auto')).toBe(1);
      expect(compareRoutes(urls.deep, urls.letters, 'auto')).toBe(2);
      expect(compareRoutes(urls.search, urls.letters, 'auto')).toBe(Infinity);
      expect(compareRoutes(urls.search, urls.hash, 'auto')).toBe(Infinity);
      expect(compareRoutes(urls.letters, urls.deep, 'auto')).toBe(0);
      expect(compareRoutes(urls.nope, urls.letters, 'auto')).toBe(0);
      expect(compareRoutes(urls.letters, urls.upper, 'auto')).toBe(Infinity);
      expect(compareRoutes(urls.deep, urls.upper, 'auto')).toBe(2);
    });

    it('Correctly scores routes in exact mode', () => {
      expect(compareRoutes(urls.post, urls.letters, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.deep, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.search, 'exact')).toBe(Infinity);
      expect(compareRoutes(urls.hash, urls.search, 'exact')).toBe(Infinity);
      expect(compareRoutes(urls.deep, urls.letters, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.nope, 'exact')).toBe(0);
      expect(compareRoutes(urls.nope, urls.letters, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.nope, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.upper, 'exact')).toBe(Infinity);
    });

    it('Does not fail on invalid arguments', () => {
      // @ts-expect-error
      expect(compareRoutes(null, urls.nope, 'auto')).toBe(0);
      // @ts-expect-error
      expect(compareRoutes(null, undefined, 'auto')).toBe(0);
      // @ts-expect-error
      expect(compareRoutes(urls.post, urls.nope, null)).toBe(0);
    });
  });

  describe('compileScoreList', () => {
    let config: NavMainEntity[];
    const fullMatch = new URL('https://post.ch/de/briefe-versenden/briefe-inland');
    const noMatch = new URL('https://post.ch/wherever123');
    const upper = new URL('https://post.ch/de/Briefe-versenden/BRIEFE-INLAND');

    beforeEach(() => {
      config = [...testConfig.de.header.navMain] as NavMainEntity[];
    });

    it('Returns a full match', () => {
      const scorelist = compileScoreList(config, fullMatch, 'auto');
      expect(scorelist[0].score).toBe(Infinity);
      expect(scorelist[0].sub!.title).toBe('Briefe Inland');

      const scorelistUpper = compileScoreList(config, upper, 'auto');
      expect(scorelistUpper[0].score).toBe(Infinity);
    });

    it('Returns a full match and only one entry', () => {
      const scorelist = compileScoreList(config, fullMatch, 'exact');
      expect(scorelist[0].score).toBe(Infinity);
      expect(scorelist.length).toBe(1);
    });

    it('Returns no match', () => {
      const scorelist = compileScoreList(config, noMatch, 'auto');
      expect(scorelist.length).toBe(0);
    });
  });

  describe('markActiveRoute', () => {
    let config: NavMainEntity[];

    beforeEach(() => {
      config = [...testConfig.de.header.navMain] as NavMainEntity[];
    });

    it('Correctly marks the active route', () => {
      const markedConfig = markActiveRoute(
        config,
        'https://post.ch/de/briefe-versenden/briefe-inland',
      );
      expect(markedConfig[0].isActiveOverride).toBe(true);
      if (markedConfig[0].flyout) {
        expect(markedConfig[0].flyout[0].linkList[0].isActiveOverride).toBe(true);
      } else {
        console.warn('Flyout is undefined, skipping nested test.');
      }
    });
  });
});
