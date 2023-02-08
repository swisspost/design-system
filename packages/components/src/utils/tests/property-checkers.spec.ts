/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

import { checkBoolean, checkNonEmptyString, checkOneOf, checkPattern } from '../property-checkers';

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

  describe('nonEmptyStringChecker', () => {
    beforeEach(() => {
      checker = checkNonEmptyString;
      errorMessage = 'Is an empty string.';
    });

    it('should not throw an error if the value is a non-empty string', () => {
      expect(runCheckerWithValue('I am a non-empty string.')).not.toThrow();
    });

    it('should throw the provided error if the value is not a string', () => {
      [undefined, null, NaN, 1, true, {}, [], () => {}].forEach((notString) => {
        expect(runCheckerWithValue(notString)).toThrow(errorMessage);
      });
    });

    it('should throw the provided error if the value is an empty string', () => {
      ['', '   '].forEach((emptyString) => {
        expect(runCheckerWithValue(emptyString)).toThrow(errorMessage);
      });
    });
  });

  describe('patternChecker', () => {
    beforeEach(() => {
      checker = checkPattern;
      checkerParameters = [/[a-z]{5}/];
      errorMessage = 'Does not match pattern.';
    });

    it('should not throw an error if the value matches the provided pattern', () => {
      expect(runCheckerWithValue('hello')).not.toThrow();
    });

    it('should throw the provided error if the value is not a string', () => {
      [undefined, null, NaN, 1, true, {}, [], () => {}].forEach((notString) => {
        expect(runCheckerWithValue(notString)).toThrow(errorMessage);
      });
    });

    it('should throw the provided error if the value does not match the provided pattern', () => {
      expect(runCheckerWithValue('WORLD')).toThrow(errorMessage);
    });
  });
});
