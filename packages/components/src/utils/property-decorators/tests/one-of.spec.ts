jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { OneOf } from '../one-of';

const ALLOWED = ['a', 'b', 'c'] as const;

describe('OneOf decorator', () => {
  function createComponent(propValue: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @OneOf(ALLOWED)
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error when value is in the allowed list', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('a');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error when value is not in the allowed list', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('invalid');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be one of [a, b, c]. Received: "invalid".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('a');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 'invalid';
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be one of [a, b, c]. Received: "invalid".',
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

  it('should not log an error when changing to a valid value', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('a');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 'b';
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should work with numeric values', () => {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @OneOf([1, 2, 3])
      testProp: unknown;

      componentDidLoad() {}
    }

    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = new TestComponent();
    instance.testProp = 2;
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
