jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { Url } from '../url';

describe('Url decorator', () => {
  function createComponent(propValue: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Url()
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error for a valid absolute URL', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('https://example.com');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error for a valid relative URL', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('/path/to/page');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error for a URL instance', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent(new URL('https://example.com'));
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error when value is not a string or URL', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent(123);
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a valid URL. Received: 123.',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should log an error for an invalid URL string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('http://[invalid');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a valid URL. Received: "http://[invalid".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('https://valid.com');
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 123;
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be a valid URL. Received: 123.',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should not validate before componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    createComponent(123);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
