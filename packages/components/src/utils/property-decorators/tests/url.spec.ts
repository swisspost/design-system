import { Url } from '../url';

class DecoratedUrlComponent {
  @Url() urlValue: unknown = '';
}

describe('Url decorator', () => {
  let component: DecoratedUrlComponent;

  beforeEach(() => {
    component = new DecoratedUrlComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedUrlComponent, value: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error for a valid absolute URL', () => {
    setPropertyInitialValue('urlValue', 'https://example.com');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error for a valid relative URL', () => {
    setPropertyInitialValue('urlValue', '/path/to/page');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error for a URL instance', () => {
    setPropertyInitialValue('urlValue', new URL('https://example.com'));
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error when value is not a string or URL', () => {
    setPropertyInitialValue('urlValue', 123);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "urlValue" must be a valid URL. Received: 123.',
      expect.any(Object),
    );
  });

  it('should log an error for an invalid URL string', () => {
    setPropertyInitialValue('urlValue', 'https://[invalid');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "urlValue" must be a valid URL. Received: "https://[invalid".',
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('urlValue', 'https://valid.com');
    (console.error as jest.Mock).mockClear();

    component.urlValue = 123;
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "urlValue" must be a valid URL. Received: 123.',
      expect.any(Object),
    );
  });

  it('should not validate before componentDidLoad', () => {
    component.urlValue = 123;
    expect(console.error).not.toHaveBeenCalled();
  });
});
