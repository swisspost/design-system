import { checkLessThan } from '../check-less-than';

describe('checkLessThan', () => {
  const rangeError = 'The prop `prop` of the `post-component` component must be less than `10`.';
  const typeError = 'The prop `prop` of the `post-component` component must be of type `number`.';

  const runCheckForValue = (value: unknown) => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkLessThan(component, 'prop', 10);
  };

  it('should not log an error if the value is less than the maximum', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [-10, 0, 9.9999].forEach(validValue => {
      runCheckForValue(validValue);
      expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(rangeError));
    });

    consoleErrorSpy.mockRestore();
  });

  it('should log an error if the value is greater than or equal to the maximum', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [10, 11, 100].forEach(invalidValue => {
      runCheckForValue(invalidValue);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(rangeError));
    });

    consoleErrorSpy.mockRestore();
  });

  it('should log an error if the value is not a number', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [undefined, null, '10', true, [], {}].forEach(invalidValue => {
      runCheckForValue(invalidValue);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(typeError));
    });

    consoleErrorSpy.mockRestore();
  });
});
