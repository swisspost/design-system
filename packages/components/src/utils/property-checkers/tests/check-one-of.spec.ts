import { checkOneOf } from '../check-one-of';

describe('checkOneOf', () => {
  const possibleValues = ['A', 'B', 'C', 'D'];
  const error = 'Is not one of.';

  const runCheckForValue = (value: string) => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkOneOf(component, 'prop', possibleValues, error);
  };

  it('should not log an error if the value is one of the possible values', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    runCheckForValue('A');
    expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(error));
    consoleErrorSpy.mockRestore();
  });

  it('should log the provided error if the value is not one of the possible values', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    runCheckForValue('E');
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(error));
    consoleErrorSpy.mockRestore();
  });
});
