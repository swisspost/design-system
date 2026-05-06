jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { createValidatorDecorator, getValidationContext } from '../create-validator-decorator';
import { OneOf } from '../one-of';
import { Required } from '../required';

describe('createValidatorDecorator', () => {
  it('should register a validator and run it on componentDidLoad', () => {
    const runFn = jest.fn().mockReturnValue(true);

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({ priority: 1, blocking: false, run: runFn })
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = 'value';
    instance.componentDidLoad();

    expect(runFn).toHaveBeenCalledWith(instance, 'testProp');
  });

  it('should run validators on property change after componentDidLoad', () => {
    const runFn = jest.fn().mockReturnValue(true);

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({ priority: 1, blocking: false, run: runFn })
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = 'initial';
    instance.componentDidLoad();
    runFn.mockClear();

    instance.testProp = 'changed';
    expect(runFn).toHaveBeenCalledWith(instance, 'testProp');
  });

  it('should not run validators before componentDidLoad', () => {
    const runFn = jest.fn().mockReturnValue(true);

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({ priority: 1, blocking: false, run: runFn })
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = 'value';
    expect(runFn).not.toHaveBeenCalled();
  });

  it('should sort validators by priority', () => {
    const order: number[] = [];

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({
        priority: 2,
        blocking: false,
        run() {
          order.push(2);
          return true;
        },
      })
      @createValidatorDecorator({
        priority: 0,
        blocking: false,
        run() {
          order.push(0);
          return true;
        },
      })
      @createValidatorDecorator({
        priority: 1,
        blocking: false,
        run() {
          order.push(1);
          return true;
        },
      })
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = 'value';
    instance.componentDidLoad();

    expect(order).toEqual([0, 1, 2]);
  });

  it('should stop at a blocking validator that fails', () => {
    const order: number[] = [];

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({
        priority: 1,
        blocking: false,
        run() {
          order.push(1);
          return true;
        },
      })
      @createValidatorDecorator({
        priority: 0,
        blocking: true,
        run() {
          order.push(0);
          return false;
        },
      })
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = 'value';
    instance.componentDidLoad();

    expect(order).toEqual([0]);
  });

  it('should continue past a non-blocking validator that fails', () => {
    const order: number[] = [];

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({
        priority: 1,
        blocking: false,
        run() {
          order.push(1);
          return true;
        },
      })
      @createValidatorDecorator({
        priority: 0,
        blocking: false,
        run() {
          order.push(0);
          return false;
        },
      })
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = 'value';
    instance.componentDidLoad();

    expect(order).toEqual([0, 1]);
  });

  it('should handle multiple decorated properties independently', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      propA: unknown;

      @OneOf(['x', 'y'])
      propB: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.propA = 'valid';
    instance.propB = 'invalid';
    instance.componentDidLoad();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "propB" must be one of [x, y]. Received: "invalid".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should work when Required blocks OneOf on the same property', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      @OneOf(['a', 'b'])
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = undefined;
    instance.componentDidLoad();

    // Only Required should fire, OneOf should be blocked
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" is required. Received: undefined.',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should run both Required and OneOf when value is present but invalid', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      @OneOf(['a', 'b'])
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = 'invalid';
    instance.componentDidLoad();

    // Required passes, OneOf fires
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be one of [a, b]. Received: "invalid".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should call original componentDidLoad if present', () => {
    const originalFn = jest.fn();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({ priority: 1, blocking: false, run: () => true })
      testProp: unknown = 'value';

      componentDidLoad() {
        originalFn();
      }
    }

    const instance = new TestComponent();
    instance.componentDidLoad();
    expect(originalFn).toHaveBeenCalledTimes(1);
  });

  it('should create componentDidLoad when none exists', () => {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @createValidatorDecorator({ priority: 1, blocking: false, run: () => true })
      testProp: unknown;
    }

    const instance = new TestComponent();
    expect(typeof (instance as any).componentDidLoad).toBe('function');
  });
});

describe('getValidationContext', () => {
  it('should return value and showError function', () => {
    const component = {
      host: { localName: 'post-accordion' } as HTMLElement,
      headingLevel: 'h2',
    };

    const ctx = getValidationContext(component, 'headingLevel');
    expect(ctx.value).toBe('h2');
    expect(typeof ctx.showError).toBe('function');
  });

  it('should log formatted message with host when showError is called', () => {
    const host = { localName: 'post-accordion' } as HTMLElement;
    const component = { host, myProp: 'bad' };

    const spy = jest.spyOn(console, 'error').mockImplementation();
    const ctx = getValidationContext(component, 'myProp');
    ctx.showError('must be valid');
    expect(spy).toHaveBeenCalledWith(
      '[post-accordion] Property "myProp" must be valid. Received: "bad".',
      host,
    );
    spy.mockRestore();
  });
});
