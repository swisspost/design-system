import { BetweenOptions, checkBetween } from '../check-between';

describe('checkBetween', () => {
  const runCheckForValue = (value: unknown, options?: BetweenOptions) => {
    const component = { host: { localName: 'post-component' } as HTMLElement, prop: value };
    checkBetween(component, 'prop', 0, 10, options);
  };

  it('should include both boundaries by default', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [0, 5, 10].forEach(validValue => {
      runCheckForValue(validValue);
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should support exclusive boundaries', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    runCheckForValue(5, { includeMin: false, includeMax: false });
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    runCheckForValue(0, { includeMin: false, includeMax: false });
    runCheckForValue(10, { includeMin: false, includeMax: false });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);

    consoleErrorSpy.mockRestore();
  });

  it('should support inclusive minimum and exclusive maximum', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    runCheckForValue(0, { includeMin: true, includeMax: false });
    runCheckForValue(9.9, { includeMin: true, includeMax: false });
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    runCheckForValue(10, { includeMin: true, includeMax: false });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });

  it('should support exclusive minimum and inclusive maximum', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    runCheckForValue(10, { includeMin: false, includeMax: true });
    runCheckForValue(0.1, { includeMin: false, includeMax: true });
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    runCheckForValue(0, { includeMin: false, includeMax: true });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });

  it('should log an error when the value is outside of the configured range', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [-1, 11].forEach(invalidValue => {
      runCheckForValue(invalidValue);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('should log an error when the value is not a number', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    [undefined, null, '5', true, [], {}].forEach(invalidValue => {
      runCheckForValue(invalidValue);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
