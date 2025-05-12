import { checkUrl } from '../check-url';

describe('checkUrl', () => {
  const errorMessage = 'Invalid URL';

  test('should not log an error if the value is an URL string or an URL object', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    [
      'https://www.example.com',
      new URL('https://www.example.com'),
      '/',
      '/home',
      '',
      'valid-url',
      'mailto:email@me.something',
      'localhost:3000',
    ].forEach(validUrl => {
      const component = { host: { localName: 'post-component' } as HTMLElement, prop: validUrl };
      checkUrl(component, 'prop', errorMessage);
      expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.stringContaining(errorMessage));
    });
    consoleErrorSpy.mockRestore();
  });

  test('should log an error if the value is not an URL string or an URL object', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    [
      123,
      true,
      null,
      undefined,
      ['https://www.example.com'],
      { url: 'https://www.example.com' },
      () => 'https://www.example.com',
    ].forEach(invalidUrl => {
      const component = { host: { localName: 'post-component' } as HTMLElement, prop: invalidUrl };
      // Type casting because we know that these are not valid arguments, it's just for testing
      checkUrl(component, 'prop', errorMessage);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(errorMessage));
    });
    consoleErrorSpy.mockRestore();
  });
});
