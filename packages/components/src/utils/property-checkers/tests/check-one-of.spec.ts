import { checkOneOf } from '../check-one-of';

let component: any; // Declare component globally
let prop: string; // Declare prop globally

beforeEach(() => {
  // Create a mock component object
  component = { host: { localName: 'post-component' } };
  prop = 'testProp';
});

describe('checkOneOf', () => {
  const possibleValues = ['A', 'B', 'C', 'D'];
  const error = 'Is not one of.';
  const runCheckForValue = (value: string) => () => {
    component[prop] = value;
    checkOneOf(component, prop, possibleValues, error);
  };

  it('should not throw an error if the value is one of the possible values', () => {
    expect(runCheckForValue('A')).not.toThrow();
  });

  it('should throw the provided error if the value is not one of the possible values', () => {
    expect(runCheckForValue('E')).toThrow(error);
  });
});
