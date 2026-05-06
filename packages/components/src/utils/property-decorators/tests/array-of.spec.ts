jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { ArrayOf } from '../array-of';

describe('ArrayOf decorator', () => {
  function createComponent(propValue: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @ArrayOf('number')
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error for a valid array of the specified type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent([1, 2, 3]);
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error for an empty array', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent([]);
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error when value is not an array', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('not-array');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a "number" array. Received: "not-array".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should log an error when array contains wrong types', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent([1, 'two', 3]);
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a "number" array. Received: [1,"two",3].',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent([1, 2]);
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = ['a', 'b'];
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a "number" array. Received: ["a","b"].',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should not validate before componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    createComponent('invalid');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should work with string type', () => {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @ArrayOf('string')
      testProp: unknown;

      componentDidLoad() {}
    }

    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = new TestComponent();
    instance.testProp = ['a', 'b'];
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error for string type with non-string elements', () => {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @ArrayOf('string')
      testProp: unknown;

      componentDidLoad() {}
    }

    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = new TestComponent();
    instance.testProp = [1, 2];
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a "string" array. Received: [1,2].',
      expect.any(Object),
    );
    spy.mockRestore();
  });
});
