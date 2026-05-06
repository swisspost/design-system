jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { IsoDate } from '../iso-date';

describe('IsoDate decorator', () => {
  function createComponent(propValue?: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @IsoDate()
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error for a valid ISO date', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('2024-01-15');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error when value is empty string (falsy)', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error when value is undefined', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent();
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error when value is null', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent(null);
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error for an invalid ISO date format', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('01-15-2024');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be in ISO format (YYYY-MM-DD). Received: "01-15-2024".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should log an error for an auto-corrected date', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('2024-02-30');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be in ISO format (YYYY-MM-DD). Received: "2024-02-30".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should log an error for a non-date string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('not-a-date');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be in ISO format (YYYY-MM-DD). Received: "not-a-date".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('2024-01-15');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 'bad-date';
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be in ISO format (YYYY-MM-DD). Received: "bad-date".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should not validate before componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    createComponent('bad-date');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
