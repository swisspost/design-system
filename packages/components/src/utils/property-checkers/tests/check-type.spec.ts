import { checkType } from '../check-type';
import { PropertyType } from '@/types';
import { isValueEmpty } from '@/utils/is-value-empty';

describe('checkType', () => {
  let type: PropertyType;
  let error: string;

  const runCheckForValue = (value: unknown) => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkType(component, 'prop', type);
  };

  describe('boolean', () => {
    beforeAll(() => {
      type = 'boolean';
      error = 'The prop `prop` of the `post-component` component must be of type `boolean`.';
    });

    it('should not log an error if the value is a boolean', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      [true, false].forEach(boolean => {
        runCheckForValue(boolean);
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
      });
      consoleErrorSpy.mockRestore();
    });

    it('should log an error if the value is not a boolean', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
      ]
        .filter(nonBoolean => !isValueEmpty(nonBoolean))
        .forEach(nonBoolean => {
          runCheckForValue(nonBoolean);
          expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
        });
      consoleErrorSpy.mockRestore();
    });
  });

  describe('number', () => {
    beforeAll(() => {
      type = 'number';
      error = 'The prop `prop` of the `post-component` component must be of type `number`.';
    });

    it('should not log an error if the value is a number', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      [42, 4.2, 4_200, 2.4434634e9].forEach(number => {
        runCheckForValue(number);
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
      });
      consoleErrorSpy.mockRestore();
    });

    it('should log an error if the value is not a number', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
      ]
        .filter(nonNumber => !isValueEmpty(nonNumber))
        .forEach(nonNumber => {
          runCheckForValue(nonNumber);
          expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
        });
      consoleErrorSpy.mockRestore();
    });
  });

  describe('string', () => {
    beforeAll(() => {
      type = 'string';
      error = 'The prop `prop` of the `post-component` component must be of type `string`.';
    });

    it('should not log an error if the value is a string', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      ['', 'string', '42', '¡¡Olé 🙌!!'].forEach(string => {
        runCheckForValue(string);
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
      });
      consoleErrorSpy.mockRestore();
    });

    it('should log an error if the value is not a string', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
      ]
        .filter(nonString => !isValueEmpty(nonString))
        .forEach(nonString => {
          runCheckForValue(nonString);
          expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
        });
      consoleErrorSpy.mockRestore();
    });
  });

  describe('array', () => {
    beforeAll(() => {
      type = 'array';
      error = 'The prop `prop` of the `post-component` component must be of type `array`.';
    });

    it('should not log an error if the value is an array', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      [[], [1, 'a']].forEach(array => {
        runCheckForValue(array);
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
      });
      consoleErrorSpy.mockRestore();
    });

    it('should log an error if the value is not an array', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
      ]
        .filter(nonArray => !isValueEmpty(nonArray))
        .forEach(nonArray => {
          runCheckForValue(nonArray);
          expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
        });
      consoleErrorSpy.mockRestore();
    });
  });

  describe('object', () => {
    beforeAll(() => {
      type = 'object';
      error = 'The prop `prop` of the `post-component` component must be of type `object`.';
    });

    it('should not log an error if the value is an object', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      [null, {}].forEach(object => {
        runCheckForValue(object);
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
      });
      consoleErrorSpy.mockRestore();
    });

    it('should log an error if the value is not an object', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      [
        undefined,
        true,
        42,
        NaN,
        'string',
        () => {
          /* empty */
        },
      ]
        .filter(nonObject => !isValueEmpty(nonObject))
        .forEach(nonObject => {
          runCheckForValue(nonObject);
          expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
        });
      consoleErrorSpy.mockRestore();
    });
  });

  describe('function', () => {
    beforeAll(() => {
      type = 'function';
      error = 'The prop `prop` of the `post-component` component must be of type `function`.';
    });

    it('should not log an error if the value is a function', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      [
        function () {
          /* empty */
        },
        () => {
          /* empty */
        },
      ].forEach(fn => {
        runCheckForValue(fn);
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
      });
      consoleErrorSpy.mockRestore();
    });
    it('should log an error if the value is not a function', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      [undefined, null, true, 42, NaN, 'string', [], {}]
        .filter(nonFn => !isValueEmpty(nonFn))
        .forEach(nonFn => {
          runCheckForValue(nonFn);
          expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
        });
      consoleErrorSpy.mockRestore();
    });
  });
});
