jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { DateValue } from '../date';

describe('DateValue decorator', () => {
  function createComponent(propValue: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @DateValue()
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error for a valid date string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('2024-01-15');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error for a valid date-time string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('2024-01-15T10:30:00');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error when value is not a string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent(12345);
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a valid date string. Received: 12345.',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should log an error for an invalid date string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('not-a-date');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a valid date string. Received: "not-a-date".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('2024-01-15');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 'invalid';
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a valid date string. Received: "invalid".',
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
});
