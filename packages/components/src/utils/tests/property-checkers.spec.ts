/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

import { checkBoolean, checkOneOf } from '../property-checkers';

describe('property-checkers', () => {
  let errorMessage: string;
  let checkerParameters: unknown[];
  let checker: (...params: unknown[]) => void;

  const runCheckerWithValue = (value: unknown) => () => {
    checker(value, ...checkerParameters, errorMessage);
  };

  beforeEach(() => {
    checkerParameters = [];
  });

  describe('oneOfChecker', () => {
    beforeEach(() => {
      checker = checkOneOf;
      checkerParameters = [['A', 'B', 'C', 'D']];
      errorMessage = 'Is not one of.';
    });

    it('should not throw an error if the value is one of the possible values', () => {
      expect(runCheckerWithValue('A')).not.toThrow();
    });

    it('should throw the provided error if the value is not one of the possible values', () => {
      expect(runCheckerWithValue('E')).toThrow(errorMessage);
    });
  });

  describe('booleanChecker', () => {
    beforeEach(() => {
      checker = checkBoolean;
      errorMessage = 'Is not boolean.';
    });

    it('should not throw an error if the value is a boolean', () => {
      [true, false].forEach((boolean) => {
        expect(runCheckerWithValue(boolean)).not.toThrow();
      });
    });

    it('should throw the provided error if the value is not a boolean', () => {
      [undefined, null, NaN, 1, 'a', {}, [], () => {}].forEach((notBoolean) => {
        expect(runCheckerWithValue(notBoolean)).toThrow(errorMessage);
      });
    });
  });
});
