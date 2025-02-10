import { checkPattern } from '../check-pattern';

describe('checkPattern', () => {
  let prop: string;
  let component: any;
  const pattern = /[a-z]{5}/;
  const error = 'Does not match pattern.';

  const runCheckForValue = (value: any) => () => {
    component[prop] = value;
    checkPattern(component, prop, pattern, error);
  };

  it('should not throw an error if the value matches the provided pattern', () => {
    expect(runCheckForValue('hello')).not.toThrow();
  });

  it('should throw the provided error if the value is not a string', () => {
    [
      undefined,
      null,
      NaN,
      1,
      true,
      {},
      [],
      () => {
        /* empty */
      },
    ].forEach(notString => {
      expect(runCheckForValue(notString)).toThrow(error);
    });
  });

  it('should throw the provided error if the value does not match the provided pattern', () => {
    expect(runCheckForValue('WORLD')).toThrow(error);
  });
});
