import { createValidatorDecorator, getValidationContext } from '../create-validator-decorator';
import { OneOf } from '../one-of';
import { Required } from '../required';

type ValidatorDecorator = (target: object, property: string) => void;

function createComponentWithDidLoad(
  decorators: ValidatorDecorator[],
  initialValue?: unknown,
  onDidLoad?: () => void,
) {
  class TestComponent {
    host = { localName: 'post-test' } as HTMLElement;
    testProp: unknown;

    componentDidLoad() {
      onDidLoad?.();
    }
  }

  decorators.forEach(decorator => decorator(TestComponent.prototype, 'testProp'));

  const instance = new TestComponent();
  if (arguments.length >= 2) {
    instance.testProp = initialValue;
  }

  return instance;
}

function createComponentWithoutDidLoad(decorators: ValidatorDecorator[]) {
  class TestComponent {
    host = { localName: 'post-test' } as HTMLElement;
    testProp: unknown;
  }

  decorators.forEach(decorator => decorator(TestComponent.prototype, 'testProp'));

  return new TestComponent();
}

describe('createValidatorDecorator', () => {
  it('should register a validator and run it on componentDidLoad', () => {
    const runFn = jest.fn().mockReturnValue(true);
    const instance = createComponentWithDidLoad(
      [createValidatorDecorator({ priority: 1, blocking: false, run: runFn })],
      'value',
    );

    instance.componentDidLoad();

    expect(runFn).toHaveBeenCalledWith(instance, 'testProp');
  });

  it('should run validators on property change after componentDidLoad', () => {
    const runFn = jest.fn().mockReturnValue(true);
    const instance = createComponentWithDidLoad(
      [createValidatorDecorator({ priority: 1, blocking: false, run: runFn })],
      'initial',
    );

    instance.componentDidLoad();
    runFn.mockClear();

    instance.testProp = 'changed';
    expect(runFn).toHaveBeenCalledWith(instance, 'testProp');
  });

  it('should not run validators before componentDidLoad', () => {
    const runFn = jest.fn().mockReturnValue(true);
    const instance = createComponentWithDidLoad(
      [createValidatorDecorator({ priority: 1, blocking: false, run: runFn })],
      'value',
    );

    expect(runFn).not.toHaveBeenCalled();
    void instance;
  });

  it('should sort validators by priority', () => {
    const order: number[] = [];
    const instance = createComponentWithDidLoad(
      [
        createValidatorDecorator({
          priority: 2,
          blocking: false,
          run() {
            order.push(2);
            return true;
          },
        }),
        createValidatorDecorator({
          priority: 0,
          blocking: false,
          run() {
            order.push(0);
            return true;
          },
        }),
        createValidatorDecorator({
          priority: 1,
          blocking: false,
          run() {
            order.push(1);
            return true;
          },
        }),
      ],
      'value',
    );

    instance.componentDidLoad();

    expect(order).toEqual([0, 1, 2]);
  });

  it('should stop at a blocking validator that fails', () => {
    const order: number[] = [];
    const instance = createComponentWithDidLoad(
      [
        createValidatorDecorator({
          priority: 1,
          blocking: false,
          run() {
            order.push(1);
            return true;
          },
        }),
        createValidatorDecorator({
          priority: 0,
          blocking: true,
          run() {
            order.push(0);
            return false;
          },
        }),
      ],
      'value',
    );

    instance.componentDidLoad();

    expect(order).toEqual([0]);
  });

  it('should continue past a non-blocking validator that fails', () => {
    const order: number[] = [];
    const instance = createComponentWithDidLoad(
      [
        createValidatorDecorator({
          priority: 1,
          blocking: false,
          run() {
            order.push(1);
            return true;
          },
        }),
        createValidatorDecorator({
          priority: 0,
          blocking: false,
          run() {
            order.push(0);
            return false;
          },
        }),
      ],
      'value',
    );

    instance.componentDidLoad();

    expect(order).toEqual([0, 1]);
  });

  it('should handle multiple decorated properties independently', () => {
    console.error = jest.fn();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;
      propA: unknown;
      propB: unknown;

      componentDidLoad() {
        /* do nothing */
      }
    }

    Required()(TestComponent.prototype, 'propA');
    OneOf(['x', 'y'])(TestComponent.prototype, 'propB');

    const instance = new TestComponent();
    instance.propA = 'valid';
    instance.propB = 'invalid';
    instance.componentDidLoad();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "propB" must be one of [x, y]. Received: "invalid".',
      expect.any(Object),
    );
  });

  it('should work when Required blocks OneOf on the same property', () => {
    console.error = jest.fn();
    const instance = createComponentWithDidLoad([Required(), OneOf(['a', 'b'])]);

    instance.componentDidLoad();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "testProp" is required. Received: undefined.',
      expect.any(Object),
    );
  });

  it('should run both Required and OneOf when value is present but invalid', () => {
    console.error = jest.fn();
    const instance = createComponentWithDidLoad([Required(), OneOf(['a', 'b'])], 'invalid');

    instance.componentDidLoad();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be one of [a, b]. Received: "invalid".',
      expect.any(Object),
    );
  });

  it('should call original componentDidLoad if present', () => {
    const originalFn = jest.fn();
    const instance = createComponentWithDidLoad(
      [createValidatorDecorator({ priority: 1, blocking: false, run: () => true })],
      'value',
      originalFn,
    );

    instance.componentDidLoad();
    expect(originalFn).toHaveBeenCalledTimes(1);
  });

  it('should create componentDidLoad when none exists', () => {
    const instance = createComponentWithoutDidLoad([
      createValidatorDecorator({ priority: 1, blocking: false, run: () => true }),
    ]);

    expect(typeof (instance as unknown as { componentDidLoad?: unknown }).componentDidLoad).toBe(
      'function',
    );
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
