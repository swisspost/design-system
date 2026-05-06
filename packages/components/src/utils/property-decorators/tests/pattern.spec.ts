jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { Pattern } from '../pattern';

const EMAIL_PATTERN = /^.+@.+\..+$/;

describe('Pattern decorator', () => {
  function createComponent(propValue: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Pattern(EMAIL_PATTERN)
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error when value matches the pattern', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('user@example.com');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error when value does not match the pattern', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('not-an-email');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      `[post-test] Property "testProp" must match ${EMAIL_PATTERN}. Received: "not-an-email".`,
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should log an error when value is not a string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent(123);
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      `[post-test] Property "testProp" must match ${EMAIL_PATTERN}. Received: 123.`,
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('user@example.com');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 'bad';
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not validate before componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    createComponent(123);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error when updating to a valid value', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('user@example.com');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 'other@test.org';
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
