import { EMPTY_VALUES } from '../constants';
import { checkNonEmpty } from '../check-non-empty';

const TEST_VALUES = [
  undefined,
  null,
  '',
  'string',
  NaN,
  -1000,
  0,
  1000,
  false,
  true,
  {},
  [],
  () => {
    /* empty */
  },
];

const NON_EMPTY_VALUES = TEST_VALUES.filter(
  tValue => !EMPTY_VALUES.some(eValue => eValue === tValue),
);

describe('checkNonEmpty', () => {
  const error = 'Is empty!';

  describe('empty value', () => {
    it('should not log an error if the value is a non-empty value', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      for (const value of NON_EMPTY_VALUES) {
        const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
        checkNonEmpty(component, 'prop', error);
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(error);
      }
      consoleErrorSpy.mockRestore();
    });

    it('should log an error if the value is an empty value', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      for (const value of EMPTY_VALUES) {
        const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
        checkNonEmpty(component, 'prop', error);
        expect(consoleErrorSpy).toHaveBeenCalledWith(error);
      }
      consoleErrorSpy.mockRestore();
    });
  });
});
