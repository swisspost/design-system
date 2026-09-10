import { OneOf } from '../one-of';

const ALLOWED = ['a', 'b', 'c'] as const;

class DecoratedOneOfComponent {
  @OneOf(ALLOWED) oneOfStrings: unknown = 'a';
  @OneOf([1, 2, 3]) oneOfNumbers: unknown = 1;
}

describe('OneOf decorator', () => {
  let component: DecoratedOneOfComponent;

  beforeEach(() => {
    component = new DecoratedOneOfComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedOneOfComponent, value: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error when value is in the allowed list', () => {
    setPropertyInitialValue('oneOfStrings', 'a');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error when value is not in the allowed list', () => {
    setPropertyInitialValue('oneOfStrings', 'invalid');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "oneOfStrings" must be one of [a, b, c]. Received: "invalid".',
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('oneOfStrings', 'a');
    (console.error as jest.Mock).mockClear();

    component.oneOfStrings = 'invalid';
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "oneOfStrings" must be one of [a, b, c]. Received: "invalid".',
      expect.any(Object),
    );
  });

  it('should not validate before componentDidLoad', () => {
    component.oneOfStrings = 'invalid';
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error when changing to a valid value', () => {
    setPropertyInitialValue('oneOfStrings', 'a');
    (console.error as jest.Mock).mockClear();

    component.oneOfStrings = 'b';
    expect(console.error).not.toHaveBeenCalled();
  });

  it.each([undefined, null, '', Number.NaN])(
    'should not log an error when value is empty (%s)',
    emptyValue => {
      setPropertyInitialValue('oneOfStrings', emptyValue);
      expect(console.error).not.toHaveBeenCalled();
    },
  );

  it('should work with numeric values', () => {
    setPropertyInitialValue('oneOfNumbers', 2);
    expect(console.error).not.toHaveBeenCalled();
  });
});
