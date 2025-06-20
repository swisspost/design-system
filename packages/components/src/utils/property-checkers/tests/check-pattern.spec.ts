import { checkPattern } from '../check-pattern';
import { isValueEmpty } from '@/utils/is-value-empty';
describe('checkPattern', () => {
  const pattern = /[a-z]{5}/;
  const error =
    'The prop `prop` of the `post-component` component must follow the format `/[a-z]{5}/`.';

  const runCheckForValue = (value: unknown) => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkPattern(component, 'prop', pattern);
  };

  it('should not log an error if the value matches the provided pattern', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    runCheckForValue('hello');
    expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
    consoleErrorSpy.mockRestore();
  });

  it('should log the provided error if the value is not a string', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
    ]
      .filter(notString => !isValueEmpty(notString))
      .forEach(notString => {
        runCheckForValue(notString);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
      });
    consoleErrorSpy.mockRestore();
  });

  it('should log the provided error if the value does not match the provided pattern', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    runCheckForValue('WORLD');
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
    consoleErrorSpy.mockRestore();
  });
});
