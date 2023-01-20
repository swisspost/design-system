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
    const post = new URL('https://post.ch');
    const letters = new URL('https://post.ch/briefe');
    const deep = new URL('https://post.ch/briefe/inland');
    const search = new URL('https://post.ch/briefe?q=search');
    const hash = new URL('https://post.ch/briefe#hash');
    const nope = new URL('https://post.de/briefe');

    it('Correctly scores routes in auto mode', () => {
      // Left: current browser URL, right: URL in Nav
      expect(compareRoutes(letters, post, 'auto')).toBe(1);
      expect(compareRoutes(deep, letters, 'auto')).toBe(2);
      expect(compareRoutes(search, letters, 'auto')).toBe(Infinity);
      expect(compareRoutes(search, hash, 'auto')).toBe(Infinity);
      expect(compareRoutes(letters, deep, 'auto')).toBe(0);
      expect(compareRoutes(nope, letters, 'auto')).toBe(0);
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
    });

    it('Does not fail on invalid arguments', () => {
      // @ts-expect-error
      expect(compareRoutes(null, nope, 'auto')).toBe(0);
      // @ts-expect-error
      expect(compareRoutes(null, undefined, 'auto')).toBe(0);
      // @ts-expect-error
      expect(compareRoutes(post, nope, null)).toBe(0);
    });
  });

  describe('compileScoreList', () => {
    let config: NavMainEntity[];
    const fullMatch = new URL('https://post.ch/de/briefe-versenden/briefe-inland');
    const noMatch = new URL('https://post.ch/wherever123');

    beforeEach(() => {
      config = [...testConfig.de.header.navMain] as NavMainEntity[];
    });

    it('Returns a full match', () => {
      const scorelist = compileScoreList(config, fullMatch, 'auto');
      expect(scorelist[0].score).toBe(Infinity);
      expect(scorelist[0].sub!.title).toBe('Briefe Inland');
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
      expect(markedConfig[0].flyout[0].linkList[0].isActiveOverride).toBe(true);
    });
  });
});
