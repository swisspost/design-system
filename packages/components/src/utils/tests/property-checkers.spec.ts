/*
 * Copyright 2022 by Swiss Post, Information Technology
 */
import {
  checkType,
  checkBoolean,
  checkEmptyOrType,
  checkOneOf,
  checkEmptyOrOneOf,
} from '../property-checkers';

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

  describe('typeChecker', () => {
    beforeEach(() => {
      checker = checkType;
    });

    it('should not throw an error if the value is boolean', () => {
      checkerParameters = ['boolean'];
      errorMessage = 'Is not boolean.';
      [true, false].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is number', () => {
      checkerParameters = ['number'];
      errorMessage = 'Is not number.';
      [42, 4.2, 4_200, 2.4434634e9, NaN].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is string', () => {
      checkerParameters = ['string'];
      errorMessage = 'Is not string.';
      ['', 'string', '42', '¡¡Olé 🙌!!'].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is array', () => {
      checkerParameters = ['array'];
      errorMessage = 'Is not array.';
      [[]].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is object', () => {
      checkerParameters = ['object'];
      errorMessage = 'Is not object.';
      [null, {}].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is function', () => {
      checkerParameters = ['function'];
      errorMessage = 'Is not function.';
      [function () {/* empty */}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should throw an error if the value is not boolean', () => {
      checkerParameters = ['boolean'];
      errorMessage = 'Is boolean.';
      [undefined, null, 42, NaN, 'string', [], {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not number', () => {
      checkerParameters = ['number'];
      errorMessage = 'Is number.';
      [undefined, null, true, 'string', [], {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not string', () => {
      checkerParameters = ['string'];
      errorMessage = 'Is string.';
      [undefined, null, true, 42, NaN, [], {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not array', () => {
      checkerParameters = ['array'];
      errorMessage = 'Is array.';
      [undefined, null, true, 42, NaN, 'string', {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not object', () => {
      checkerParameters = ['object'];
      errorMessage = 'Is object.';
      [undefined, true, 42, NaN, 'string', () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not function', () => {
      checkerParameters = ['function'];
      errorMessage = 'Is function.';
      [undefined, null, true, 42, NaN, 'string', [], {}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });
  });

  describe('emptyOrTypeChecker', () => {
    beforeEach(() => {
      checker = checkEmptyOrType;
    });

    it('should not throw an error if the value is empty or boolean', () => {
      checkerParameters = ['boolean'];
      errorMessage = 'Is not empty or boolean.';
      [undefined, null, '', true, false].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is empty or number', () => {
      checkerParameters = ['number'];
      errorMessage = 'Is not empty or number.';
      [undefined, null, '', 42, 4.2, 4_200, 2.4434634e9, NaN].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is empty or string', () => {
      checkerParameters = ['string'];
      errorMessage = 'Is not empty or string.';
      [undefined, null, '', 'string', '42', '¡¡Olé 🙌!!'].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is empty or array', () => {
      checkerParameters = ['array'];
      errorMessage = 'Is not empty or array.';
      [undefined, null, '', []].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is empty or object', () => {
      checkerParameters = ['object'];
      errorMessage = 'Is not empty or object.';
      [undefined, '', null, {}].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should not throw an error if the value is empty or function', () => {
      checkerParameters = ['function'];
      errorMessage = 'Is not empty or function.';
      [undefined, null, '', function () {/* empty */}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should throw an error if the value is not empty or boolean', () => {
      checkerParameters = ['boolean'];
      errorMessage = 'Is empty or boolean.';
      [42, NaN, 'string', [], {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not empty or number', () => {
      checkerParameters = ['number'];
      errorMessage = 'Is number.';
      [true, 'string', [], {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not empty or string', () => {
      checkerParameters = ['string'];
      errorMessage = 'Is empty or string.';
      [true, 42, NaN, [], {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not empty or array', () => {
      checkerParameters = ['array'];
      errorMessage = 'Is empty or array.';
      [true, 42, NaN, 'string', {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not empty or object', () => {
      checkerParameters = ['object'];
      errorMessage = 'Is empty or object.';
      [true, 42, NaN, 'string', () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });

    it('should throw an error if the value is not empty or function', () => {
      checkerParameters = ['function'];
      errorMessage = 'Is empty or function.';
      [true, 42, NaN, 'string', [], {}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });
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

  describe('emptyOrOneOfChecker', () => {
    beforeEach(() => {
      checker = checkEmptyOrOneOf;
      checkerParameters = [['A', 'B', 'C', 'D']];
      errorMessage = 'Is not empty or one of.';
    });

    it('should not throw an error if the value is empty or one of the possible values', () => {
      [undefined, null, '', 'A'].forEach(v => {
        expect(runCheckerWithValue(v)).not.toThrow();
      });
    });

    it('should throw the provided error if the value is not one of the possible values', () => {
      [true, 42, NaN, 'E', [], {}, () => {/* empty */}].forEach(v => {
        expect(runCheckerWithValue(v)).toThrow();
      });
    });
  });

  describe('booleanChecker', () => {
    beforeEach(() => {
      checker = checkBoolean;
      errorMessage = 'Is not boolean.';
    });

    it('should not throw an error if the value is a boolean', () => {
      [true, false].forEach(boolean => {
        expect(runCheckerWithValue(boolean)).not.toThrow();
      });
    });

    it('should throw the provided error if the value is not a boolean', () => {
      [undefined, null, NaN, 1, 'a', {}, [], () => {/* empty */}].forEach(notBoolean => {
        expect(runCheckerWithValue(notBoolean)).toThrow(errorMessage);
      });
    });
  });
});
