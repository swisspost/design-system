import { createIdFrom } from './create-id-from';

describe('createIdFrom', () => {
  describe('empty string validation', () => {
    const testCases = ['', '   ', '\t\n  \t'];

    it.each(testCases)('should throw error for "%s"', input => {
      expect(() => createIdFrom(input)).toThrow(
        'createIdFrom: input string cannot be empty or whitespace only',
      );
    });
  });

  describe('basic id generation', () => {
    const testCases = [
      ['Hello', 'hello'],
      ['hello world', 'hello-world'],
      ['hello   world', 'hello-world'],
      ['  hello world  ', 'hello-world'],
      ['Hello World Test', 'hello-world-test'],
      ['a', 'a'],
      ['item 123', 'item-123'],
      ['123', '123'],
      ['my-id', 'my-id'],
      ['hello     world', 'hello-world'],
      ['hello\tworld\ntest', 'hello-world-test'],
    ];

    it.each(testCases)('should convert "%s" to "%s"', (input, expected) => {
      expect(createIdFrom(input)).toBe(expected);
    });
  });

  describe('id uniqueness', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('should return base id when no conflict exists', () => {
      expect(createIdFrom('unique')).toBe('unique');
    });

    const testCases = [
      ['<div id="test-id"></div>', 'test-id-1'],
      ['<div id="test-id"></div><div id="test-id-1"></div>', 'test-id-2'],
      [
        '<div id="item"></div><div id="item-1"></div><div id="item-2"></div><div id="item-3"></div>',
        'item-4',
      ],
      ['<div id="test"></div><div id="test-1"></div><div id="test-3"></div>', 'test-2'],
    ];

    it.each(testCases)('should find next available id with DOM: %s', (domHtml, expected) => {
      document.body.innerHTML = domHtml;
      expect(
        createIdFrom(
          'test id' === expected.replace(/-\d+$/, '') ? 'test id' : expected.replace(/-\d+$/, ''),
        ),
      ).toBe(expected);
    });
  });
});
