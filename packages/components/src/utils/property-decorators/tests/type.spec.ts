jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  return { ...actual, getElement: (ref: { host: HTMLElement }) => ref.host };
});

import { Type } from '../type';

describe('Type decorator', () => {
  function createComponent(type: string, propValue: unknown) {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Type(type as any)
      testProp: unknown;

      componentDidLoad() {}
    }

    const instance = new TestComponent();
    instance.testProp = propValue;
    return instance;
  }

  it('should not log an error when value matches string type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('string', 'hello');
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error when value matches number type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('number', 42);
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should not log an error when value matches boolean type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('boolean', true);
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error when value does not match the type', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('number', 'not-a-number');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be of type "number". Received: "not-a-number".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should handle array type correctly for valid arrays', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('array', [1, 2, 3]);
    instance.componentDidLoad();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log an error when expecting array but value is not', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('array', 'not-array');
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be of type "array". Received: "not-array".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should log an error when value is array but type is not array', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('string', ['array']);
    instance.componentDidLoad();
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be of type "string". Received: ["array"].',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should validate on property change after componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const instance = createComponent('number', 42);
    instance.componentDidLoad();
    spy.mockClear();

    instance.testProp = 'string';
    expect(spy).toHaveBeenCalledWith(
      '[post-test] Property "testProp" must be of type "number". Received: "string".',
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it('should not validate before componentDidLoad', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    createComponent('number', 'wrong');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
