import { checkType } from '../check-type';
import { PropertyType } from '@/types';

describe('checkType', () => {
  let type: PropertyType;
  let error: string;

  const runCheckForValue = (value: unknown) => () => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkType(component, 'prop', type);
  };

  describe('boolean', () => {
    beforeAll(() => {
      type = 'boolean';
      error = 'The prop `prop` of the `post-component` component must be of type `boolean`.';
    });

    it('should not throw an error if the value is a boolean', () => {
      [true, false].forEach(boolean => {
        expect(runCheckForValue(boolean)).not.toThrow();
      });
    });

    it('should throw an error if the value is not a boolean', () => {
      [
        undefined,
        null,
        42,
        NaN,
        'string',
        [],
        {},
        () => {
          /* empty */
        },
      ].forEach(nonBoolean => {
        expect(runCheckForValue(nonBoolean)).toThrow(error);
      });
    });
  });

  describe('number', () => {
    beforeAll(() => {
      type = 'number';
      error = 'The prop `prop` of the `post-component` component must be of type `number`.';
    });

    it('should not throw an error if the value is a number', () => {
      [42, 4.2, 4_200, 2.4434634e9, NaN].forEach(number => {
        expect(runCheckForValue(number)).not.toThrow();
      });
    });

    it('should throw an error if the value is not a number', () => {
      [
        undefined,
        null,
        true,
        'string',
        [],
        {},
        () => {
          /* empty */
        },
      ].forEach(nonNumber => {
        expect(runCheckForValue(nonNumber)).toThrow(error);
      });
    });
  });

  describe('string', () => {
    beforeAll(() => {
      type = 'string';
      error = 'The prop `prop` of the `post-component` component must be of type `string`.';
    });

    it('should not throw an error if the value is a string', () => {
      ['', 'string', '42', '¡¡Olé 🙌!!'].forEach(string => {
        expect(runCheckForValue(string)).not.toThrow();
      });
    });

    it('should throw an error if the value is not string', () => {
      [
        undefined,
        null,
        true,
        42,
        NaN,
        [],
        {},
        () => {
          /* empty */
        },
      ].forEach(nonString => {
        expect(runCheckForValue(nonString)).toThrow(error);
      });
    });
  });

  describe('array', () => {
    beforeAll(() => {
      type = 'array';
      error = 'The prop `prop` of the `post-component` component must be of type `array`.';
    });

    it('should not throw an error if the value is an array', () => {
      [[], [1, 'a']].forEach(array => {
        expect(runCheckForValue(array)).not.toThrow();
      });
    });

    it('should throw an error if the value is not an array', () => {
      [
        undefined,
        null,
        true,
        42,
        NaN,
        'string',
        {},
        () => {
          /* empty */
        },
      ].forEach(nonArray => {
        expect(runCheckForValue(nonArray)).toThrow(error);
      });
    });
  });

  describe('object', () => {
    beforeAll(() => {
      type = 'object';
      error = 'The prop `prop` of the `post-component` component must be of type `object`.';
    });

    it('should not throw an error if the value is an object', () => {
      [null, {}].forEach(object => {
        expect(runCheckForValue(object)).not.toThrow();
      });
    });

    it('should throw an error if the value is not an object', () => {
      [
        undefined,
        true,
        42,
        NaN,
        'string',
        () => {
          /* empty */
        },
      ].forEach(nonObject => {
        expect(runCheckForValue(nonObject)).toThrow(error);
      });
    });
  });

  describe('function', () => {
    beforeAll(() => {
      type = 'function';
      error = 'The prop `prop` of the `post-component` component must be of type `function`.';
    });

    it('should not throw an error if the value is a function', () => {
      [
        function () {
          /* empty */
        },
        () => {
          /* empty */
        },
      ].forEach(fn => {
        expect(runCheckForValue(fn)).not.toThrow();
      });
    });

    it('should throw an error if the value is not a function', () => {
      [undefined, null, true, 42, NaN, 'string', [], {}].forEach(nonFn => {
        expect(runCheckForValue(nonFn)).toThrow(error);
      });
    });
  });
});
