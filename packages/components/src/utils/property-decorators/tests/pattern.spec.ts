import { Pattern } from '../pattern';

const EMAIL_PATTERN = /^[^@\s]{1,64}@[A-Za-z0-9.-]{1,255}\.[A-Za-z]{2,63}$/;

class DecoratedPatternComponent {
  @Pattern(EMAIL_PATTERN) emailValue: unknown = '';
}

describe('Pattern decorator', () => {
  let component: DecoratedPatternComponent;

  beforeEach(() => {
    component = new DecoratedPatternComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedPatternComponent, value: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error when value matches the pattern', () => {
    setPropertyInitialValue('emailValue', 'user@example.com');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error when value does not match the pattern', () => {
    setPropertyInitialValue('emailValue', 'not-an-email');
    expect(console.error).toHaveBeenCalledWith(
      `[post-test] Property "emailValue" must match ${EMAIL_PATTERN}. Received: "not-an-email".`,
      expect.any(Object),
    );
  });

  it('should log an error when value is not a string', () => {
    setPropertyInitialValue('emailValue', 123);
    expect(console.error).toHaveBeenCalledWith(
      `[post-test] Property "emailValue" must match ${EMAIL_PATTERN}. Received: 123.`,
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('emailValue', 'user@example.com');
    (console.error as jest.Mock).mockClear();

    component.emailValue = 'bad';
    expect(console.error).toHaveBeenCalled();
  });

  it('should not validate before componentDidLoad', () => {
    component.emailValue = 123;
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error when updating to a valid value', () => {
    setPropertyInitialValue('emailValue', 'user@example.com');
    (console.error as jest.Mock).mockClear();

    component.emailValue = 'other@test.org';
    expect(console.error).not.toHaveBeenCalled();
  });

  it.each([undefined, null, '', Number.NaN])(
    'should not log an error when value is empty (%s)',
    emptyValue => {
      setPropertyInitialValue('emailValue', emptyValue);
      expect(console.error).not.toHaveBeenCalled();
    },
  );
});
