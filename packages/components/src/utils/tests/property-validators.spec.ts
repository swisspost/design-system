/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

import { booleanValidator, oneOfValidator } from '../property-validators';

describe('property-validators', () => {
  let errorMessage: string;
  let validatorParameters: unknown[];
  let validator: (...params: unknown[]) => void;

  const runValidatorWithValue = (value: unknown) => () => {
    validator(value, ...validatorParameters, errorMessage);
  };

  beforeEach(() => {
    validatorParameters = [];
  });

  describe('oneOfValidator', () => {
    beforeEach(() => {
      validator = oneOfValidator;
      validatorParameters = [['A', 'B', 'C', 'D']];
      errorMessage = 'Is not one of.';
    });

    it('should not throw an error if the value is one of the possible values', () => {
      expect(runValidatorWithValue('A')).not.toThrow();
    });

    it('should throw the provided error if the value is not one of the possible values', () => {
      expect(runValidatorWithValue('E')).toThrow(errorMessage);
    });
  });

  describe('booleanValidator', () => {
    beforeEach(() => {
      validator = booleanValidator;
      errorMessage = 'Is not boolean.';
    });

    it('should not throw an error if the value is a boolean', () => {
      [true, false].forEach((boolean) => {
        expect(runValidatorWithValue(boolean)).not.toThrow();
      });
    });

    it('should throw the provided error if the value is not a boolean', () => {
      [undefined, null, NaN, 1, 'a', {}, [], () => {}].forEach((notBoolean) => {
        expect(runValidatorWithValue(notBoolean)).toThrow(errorMessage);
      });
    });
  });
});
