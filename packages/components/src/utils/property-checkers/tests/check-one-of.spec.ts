import { checkOneOf } from '../check-one-of';

describe('checkOneOf', () => {
  const possibleValues = ['A', 'B', 'C', 'D'];
  const error = 'Is not one of.';
  const runCheckForValue = value => () => checkOneOf(value, possibleValues, error);

  it('should not throw an error if the value is one of the possible values', () => {
    expect(runCheckForValue('A')).not.toThrow();
  });

  it('should throw the provided error if the value is not one of the possible values', () => {
    expect(runCheckForValue('E')).toThrow(error);
  });
});
