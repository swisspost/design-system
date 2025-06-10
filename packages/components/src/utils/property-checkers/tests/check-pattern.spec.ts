import { checkPattern } from '../check-pattern';

describe('checkPattern', () => {
  const pattern = /[a-z]{5}/;
  const error =
    'The prop `prop` of the `post-component` component must follow the format `/[a-z]{5}/`.';

  const runCheckForValue = (value: unknown) => () => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkPattern(component, 'prop', pattern);
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
