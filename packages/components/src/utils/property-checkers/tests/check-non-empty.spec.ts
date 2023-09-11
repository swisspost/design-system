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

describe('notEmpty', () => {
  const error = 'Is empty!';

  describe('empty value', () => {
    it('should not throw an error if the value is an non-empty value', () => {
      NON_EMPTY_VALUES.forEach(value => {
        expect(() => checkNonEmpty(value, error)).not.toThrow();
      });
    });

    it('should throw an error if the value is an empty value', () => {
      EMPTY_VALUES.forEach(value => {
        expect(() => checkNonEmpty(value, error)).toThrow(error);
      });
    });
  });
});
