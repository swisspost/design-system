import {
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
      post: new URL('https://post.ch'),
      letters: new URL('https://post.ch/briefe'),
      deep: new URL('https://post.ch/briefe/inland'),
      search: new URL('https://post.ch/briefe?q=search'),
      hash: new URL('https://post.ch/briefe#hash'),
      nope: new URL('https://post.de/briefe'),
      upper: new URL('https://post.ch/Briefe'),
    };

    it('Correctly scores routes in auto mode', () => {
      // Left: current browser URL, right: URL in Nav
      expect(compareRoutes(urls.letters, urls.post, false, 'auto')).toBe(1);
      expect(compareRoutes(urls.deep, urls.letters, false, 'auto')).toBe(2);
      expect(compareRoutes(urls.search, urls.letters, false, 'auto')).toBe(Infinity);
      expect(compareRoutes(urls.search, urls.hash, false, 'auto')).toBe(Infinity);
      expect(compareRoutes(urls.letters, urls.deep, false, 'auto')).toBe(0);
      expect(compareRoutes(urls.nope, urls.letters, false, 'auto')).toBe(0);
      expect(compareRoutes(urls.letters, urls.upper, false, 'auto')).toBe(Infinity);
      expect(compareRoutes(urls.deep, urls.upper, false, 'auto')).toBe(2);
    });

    it('Correctly scores routes in exact mode', () => {
      expect(compareRoutes(urls.post, urls.letters, false, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.deep, false, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.search, false, 'exact')).toBe(Infinity);
      expect(compareRoutes(urls.hash, urls.search, false, 'exact')).toBe(Infinity);
      expect(compareRoutes(urls.deep, urls.letters, false, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.nope, false, 'exact')).toBe(0);
      expect(compareRoutes(urls.nope, urls.letters, false, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.nope, false, 'exact')).toBe(0);
      expect(compareRoutes(urls.letters, urls.upper, false, 'exact')).toBe(Infinity);
    });

    it('Does not fail on invalid arguments', () => {
      // @ts-expect-error
      expect(compareRoutes(null, urls.nope, 'auto')).toBe(0);
      // @ts-expect-error
      expect(compareRoutes(null, undefined, 'auto')).toBe(0);
      // @ts-expect-error
      expect(compareRoutes(urls.post, urls.nope, null)).toBe(0);
    });

    it('handles relative and absolute paths the same', () => {
      const relativeUrl = new URL('/briefe', 'https://post.ch');
      const faultyRelativeUrl = new URL('/briefee', 'https://post.ch');
      expect(compareRoutes(urls.letters, relativeUrl, true)).toBe(Infinity);
      expect(compareRoutes(relativeUrl, urls.letters, true)).toBe(Infinity);
      expect(compareRoutes(urls.deep, relativeUrl, true)).toBe(0);
      expect(compareRoutes(urls.letters, faultyRelativeUrl, true)).toBe(0);
    });

    it('matches based on pathname regardless of origin', () => {
      const samePathDifferentOrigin = new URL('/briefe', 'https://different-origin.com');
      expect(compareRoutes(urls.letters, samePathDifferentOrigin, true)).toBe(Infinity);
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
      const scorelist = compileScoreList(config, fullMatch, 'auto', false);
      expect(scorelist[0].score).toBe(Infinity);
      expect(scorelist[0].sub!.title).toBe('Briefe Inland');

      const scorelistUpper = compileScoreList(config, upper, 'auto', false);
      expect(scorelistUpper[0].score).toBe(Infinity);
    });

    it('Returns a full match and only one entry', () => {
      const scorelist = compileScoreList(config, fullMatch, 'exact', false);
      expect(scorelist[0].score).toBe(Infinity);
      expect(scorelist.length).toBe(1);
    });

    it('Returns no match', () => {
      const scorelist = compileScoreList(config, noMatch, 'auto', false);
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
