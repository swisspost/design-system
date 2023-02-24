import { PropertyType } from '../check-type';
import { checkType } from '../check-type';

describe('checkType', () => {
  let type: PropertyType;
  let errorMessage: string;
  const runCheckForValue = value => () => checkType(value, type, errorMessage);

  describe('boolean', () => {
    beforeAll(() => {
      type = 'boolean';
      errorMessage = 'Value is not a boolean.';
    });

    it('should not throw an error if the value is a boolean', () => {
      [true, false].forEach(boolean => {
        expect(runCheckForValue(boolean)).not.toThrow();
      });
    });

    it('should throw an error if the value is not a boolean', () => {
      [undefined, null, 42, NaN, 'string', [], {}, () => {/* empty */}].forEach(nonBoolean => {
        expect(runCheckForValue(nonBoolean)).toThrow(errorMessage);
      });
    });
  });

  describe('number', () => {
    beforeAll(() => {
      type = 'number';
      errorMessage = 'Value is not a number.';
    });

    it('should not throw an error if the value is a number', () => {
      [ 42, 4.2, 4_200, 2.4434634e9, NaN ].forEach(number => {
        expect(runCheckForValue(number)).not.toThrow();
      });
    });

    it('should throw an error if the value is not a number', () => {
      [undefined, null, true, 'string', [], {}, () => {/* empty */}].forEach(nonNumber => {
        expect(runCheckForValue(nonNumber)).toThrow(errorMessage);
      });
    });
  });

  describe('string', () => {
    beforeAll(() => {
      type = 'string';
      errorMessage = 'Is not string.';
    });

    it('should not throw an error if the value is a string', () => {
      ['', 'string', '42', '¡¡Olé 🙌!!'].forEach(string => {
        expect(runCheckForValue(string)).not.toThrow();
      });
    });

    it('should throw an error if the value is not string', () => {
      [undefined, null, true, 42, NaN, [], {}, () => {/* empty */}].forEach(nonString => {
        expect(runCheckForValue(nonString)).toThrow(errorMessage);
      });
    });
  });

  describe('array', () => {
    beforeAll(() => {
      type = 'array';
      errorMessage = 'Is not array.';
    });

    it('should not throw an error if the value is an array', () => {
      [[], [1, 'a']].forEach(array => {
        expect(runCheckForValue(array)).not.toThrow();
      });
    });

    it('should throw an error if the value is not an array', () => {
      [undefined, null, true, 42, NaN, 'string', {}, () => {/* empty */}].forEach(nonArray => {
        expect(runCheckForValue(nonArray)).toThrow(errorMessage);
      });
    });
  });

  describe('object', () => {
    beforeAll(() => {
      type = 'object';
      errorMessage = 'Is not object.';
    });

    it('should not throw an error if the value is an object', () => {
      [null, {}].forEach(object => {
        expect(runCheckForValue(object)).not.toThrow();
      });
    });

    it('should throw an error if the value is not an object', () => {
      [undefined, true, 42, NaN, 'string', () => {/* empty */}].forEach(nonObject => {
        expect(runCheckForValue(nonObject)).toThrow(errorMessage);
      });
    });
  });

  describe('function', () => {
    beforeAll(() => {
      type = 'function';
      errorMessage = 'Is not function.';
    });

    it('should not throw an error if the value is a function', () => {
      [function () {/* empty */}, () => {/* empty */}].forEach(fn => {
        expect(runCheckForValue(fn)).not.toThrow();
      });
    });

    it('should throw an error if the value is not a function', () => {
      [undefined, null, true, 42, NaN, 'string', [], {}].forEach(nonFn => {
        expect(runCheckForValue(nonFn)).toThrow(errorMessage);
      });
    });
  });
});
