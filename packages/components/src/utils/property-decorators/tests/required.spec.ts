jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { Required } from '../required';

describe('Required decorator', () => {
  function createComponent(propValue?: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error when value is defined', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('valid');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it.each([undefined, null, '', Number.NaN])('should log an error when value is %s', emptyValue => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent(emptyValue);
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('[post-test] Property "testProp" is required.'),
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('valid');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = undefined;
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('[post-test] Property "testProp" is required.'),
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should not validate on property change before componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    createComponent();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should block subsequent validators when failing', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = undefined;
    instance.componentDidLoad();

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('should call the original componentDidLoad', () => {
    const originalFn = jest.fn();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      testProp: unknown = 'valid';

      componentDidLoad() {
        originalFn();
      }
    }

    const instance = new TestComponent();
    instance.componentDidLoad();
    expect(originalFn).toHaveBeenCalledTimes(1);
  });

  it('should work when no componentDidLoad is defined', () => {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      testProp: unknown;
    }

    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = new TestComponent();
    instance.testProp = undefined;
    (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('[post-test] Property "testProp" is required.'),
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should pass for non-empty values like 0, false, [], {}', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    [0, false, [], {}, ' '].forEach(val => {
      const instance = createComponent(val);
      instance.componentDidLoad();
    });

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
