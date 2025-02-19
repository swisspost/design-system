import { checkUrl } from '../check-url';

describe('checkUrl', () => {
  const errorMessage = 'Invalid URL';

  test('should not throw an error if the value is an URL string or an URL object', () => {
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
      expect(() => checkUrl(validUrl, errorMessage)).not.toThrow();
    });
  });

  test('should throw an error if the value is not an URL string or an URL object', () => {
    [
      123,
      true,
      null,
      undefined,
      ['https://www.example.com'],
      { url: 'https://www.example.com' },
      () => 'https://www.example.com',
    ].forEach(invalidUrl => {
      // Type casting because we know that these are not valid arguments, it's just for testing
      expect(() => checkUrl(invalidUrl as unknown as string, errorMessage)).toThrow(errorMessage);
    });
  });
});
