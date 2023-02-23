import { checkExists } from "../check-exists";


describe('checkExists', () => {
  const errorMessage = 'Does not exist.';
  const runCheckForValue = value => () => checkExists(value, errorMessage);

  it('should not throw an error if the provided value in not nullable', () => {
    [0, '', false, [], {}, () => {/* empty */}].forEach(nonNullable => {
      expect(runCheckForValue(nonNullable)).not.toThrow();
    });
  });

  it('should throw the provided error if the provided value is nullable', () => {
    [undefined, null, NaN].forEach(nullable => {
      expect(runCheckForValue(nullable)).toThrow(errorMessage);
    });
  });
});