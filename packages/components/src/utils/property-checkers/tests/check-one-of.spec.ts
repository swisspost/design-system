import { checkOneOf } from '../check-one-of';

describe('checkOneOf', () => {
  const possibleValues = ['A', 'B', 'C', 'D'];
  const errorMessage = 'Is not empty or one of.';
  const runCheckForValue = value => () => checkOneOf(value, possibleValues, errorMessage);

  it('should not throw an error if the value is one of the possible values', () => {
    expect(runCheckForValue('A')).not.toThrow();
  });

  it('should throw the provided error if the value is not one of the possible values', () => {
    expect(runCheckForValue('E')).toThrow(errorMessage);
  });
});
