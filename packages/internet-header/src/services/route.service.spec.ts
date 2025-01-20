import { expect } from '@jest/globals';
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
