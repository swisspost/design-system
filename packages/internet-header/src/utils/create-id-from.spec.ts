import { createIdFrom } from './create-id-from';

describe('createIdFrom', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('empty string validation', () => {
    it('should throw error for empty string', () => {
      expect(() => createIdFrom('')).toThrow(
        'createIdFrom: input string cannot be empty or whitespace only',
      );
    });

    it('should throw error for whitespace-only string', () => {
      expect(() => createIdFrom('   ')).toThrow(
        'createIdFrom: input string cannot be empty or whitespace only',
      );
    });

    it('should throw error for string with only tabs and newlines', () => {
      expect(() => createIdFrom('\t\n  \t')).toThrow(
        'createIdFrom: input string cannot be empty or whitespace only',
      );
    });
  });

  describe('basic id generation', () => {
    it('should convert string to lowercase', () => {
      expect(createIdFrom('Hello')).toBe('hello');
    });

    it('should replace spaces with hyphens', () => {
      expect(createIdFrom('hello world')).toBe('hello-world');
    });

    it('should handle multiple consecutive spaces', () => {
      expect(createIdFrom('hello   world')).toBe('hello-world');
    });

    it('should trim leading and trailing whitespace', () => {
      expect(createIdFrom('  hello world  ')).toBe('hello-world');
    });

    it('should handle mixed case with spaces', () => {
      expect(createIdFrom('Hello World Test')).toBe('hello-world-test');
    });

    it('should handle single character', () => {
      expect(createIdFrom('a')).toBe('a');
    });
  });

  describe('id uniqueness', () => {
    it('should return base id when no element exists with that id', () => {
      expect(createIdFrom('unique')).toBe('unique');
    });

    it('should append -1 when base id already exists', () => {
      document.body.innerHTML = '<div id="test-id"></div>';
      expect(createIdFrom('test id')).toBe('test-id-1');
    });

    it('should append -2 when both base and -1 exist', () => {
      document.body.innerHTML = `
        <div id="test-id"></div>
        <div id="test-id-1"></div>
      `;
      expect(createIdFrom('test id')).toBe('test-id-2');
    });

    it('should find next available id with multiple conflicts', () => {
      document.body.innerHTML = `
        <div id="item"></div>
        <div id="item-1"></div>
        <div id="item-2"></div>
        <div id="item-3"></div>
      `;
      expect(createIdFrom('item')).toBe('item-4');
    });

    it('should handle gaps in numbering', () => {
      document.body.innerHTML = `
        <div id="test"></div>
        <div id="test-1"></div>
        <div id="test-3"></div>
      `;
      expect(createIdFrom('test')).toBe('test-2');
    });

    it('should work with multiple different ids', () => {
      document.body.innerHTML = `
        <div id="first"></div>
        <div id="second"></div>
      `;
      expect(createIdFrom('first')).toBe('first-1');
      expect(createIdFrom('second')).toBe('second-1');
      expect(createIdFrom('third')).toBe('third');
    });
  });
});
