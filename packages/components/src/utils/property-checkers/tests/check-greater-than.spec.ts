import { checkGreaterThan } from '../check-greater-than';

describe('checkGreaterThan', () => {
  const rangeError = 'The prop `prop` of the `post-component` component must be greater than `0`.';
  const typeError = 'The prop `prop` of the `post-component` component must be of type `number`.';

  const runCheckForValue = (value: unknown) => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkGreaterThan(component, 'prop', 0);
  };

  it('should not log an error if the value is greater than the minimum', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [0.0001, 1, 42].forEach(validValue => {
      runCheckForValue(validValue);
      expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(rangeError));
    });

    consoleErrorSpy.mockRestore();
  });

  it('should log an error if the value is lower than or equal to the minimum', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [0, -1, -100].forEach(invalidValue => {
      runCheckForValue(invalidValue);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(rangeError));
    });

    consoleErrorSpy.mockRestore();
  });

  it('should log an error if the value is not a number', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [undefined, null, '1', true, [], {}].forEach(invalidValue => {
      runCheckForValue(invalidValue);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(typeError));
    });

    consoleErrorSpy.mockRestore();
  });
});
