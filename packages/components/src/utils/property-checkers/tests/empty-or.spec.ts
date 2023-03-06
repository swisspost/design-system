import { emptyOr } from '../empty-or';

describe('emptyOr', () => {
  const mockCheck = jest.fn();
  const mockEmptyOrCheck = emptyOr(mockCheck);

  it('should not run the check if the provided value is empty', () => {
    [undefined, null, ''].forEach(emptyValue => {
      mockEmptyOrCheck(emptyValue);
      expect(mockCheck).not.toHaveBeenCalled();
    });
  });

  it('should run the check if the provided value is not empty', () => {
    [0, NaN, ' ', false, [], {}, () => {/* empty */}].forEach((nonEmptyValue, index) => {
      mockEmptyOrCheck(nonEmptyValue);
      expect(mockCheck).toHaveBeenCalledTimes(index + 1);
    });
  });

  it('should pass all provided arguments to the nested check function', () => {
    const args = ['non empty value', true, false, ['arg in an array'], {arg: 'in an object'}];
    mockEmptyOrCheck(...args);
    expect(mockCheck).toHaveBeenCalledWith(...args);
  });
});
