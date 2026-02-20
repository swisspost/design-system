import { checkArrayOf } from '../check-array-of';
import { PrimitiveType } from '@/types';
import { describe } from 'node:test';

describe('checkArrayOf', () => {
  const componentName = 'post-component';
  const propName = 'myProp';
  const mockValues = [
    undefined,
    null,
    true,
    false,
    42,
    NaN,
    'string',
    '',
    [],
    {},
    () => {
      /* empty */
    },
  ];

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const primitiveTypes: PrimitiveType[] = ['boolean', 'string', 'number'];
  primitiveTypes.forEach(type => {
    describe(type, () => {
      const error = `The prop \`${propName}\` of the \`${componentName}\` component must be an \`${type}\` array.`;

      const runCheckForValue = (value: unknown) => {
        const component = { host: { localName: componentName } as HTMLElement, [propName]: value };
        checkArrayOf(component, propName, type);
      };

      it('should log an error if the value is not an array', () => {
        mockValues
          .filter(value => !Array.isArray(value))
          .forEach(value => {
            runCheckForValue(value);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
          });
      });

      it('should log an error if the array contains some values that don\'t have the expected type', () => {
        runCheckForValue(mockValues);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
      });

      it('should not log an error if the array contains only values with the expected type', () => {
        const validArray = mockValues.filter(value => typeof value === type);
        runCheckForValue(validArray);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      });
    });
  });
});
