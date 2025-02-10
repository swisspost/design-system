import { EMPTY_VALUES } from '../constants';
import { checkNonEmpty } from '../check-non-empty';
import { ComponentInterface } from '@stencil/core/internal';

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
  const prop = 'testProp';

  let component: ComponentInterface;

  beforeEach(() => {
    // Create a mock component object
    component = { host: { localName: 'post-component' } };
  });

  describe('empty value', () => {
    it('should not throw an error if the value is a non-empty value', () => {
      for (const value of NON_EMPTY_VALUES) {
        component[prop] = value;
        expect(() => checkNonEmpty(component, prop)).not.toThrow();
      }
    });

    it('should throw an error if the value is an empty value', () => {
      for (const value of EMPTY_VALUES) {
        component[prop] = value;
        expect(() => checkNonEmpty(component, prop, error)).toThrow(error);
      }
    });
  });
});
