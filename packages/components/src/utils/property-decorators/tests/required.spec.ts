import { Required } from '../required';

class DecoratedRequiredComponent {
  @Required() requiredValue: unknown;
}

describe('Required decorator', () => {
  let component: DecoratedRequiredComponent;

  beforeEach(() => {
    component = new DecoratedRequiredComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedRequiredComponent, value?: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error when value is defined', () => {
    setPropertyInitialValue('requiredValue', 'valid');
    expect(console.error).not.toHaveBeenCalled();
  });

  it.each([undefined, null, '', Number.NaN])('should log an error when value is %s', emptyValue => {
    setPropertyInitialValue('requiredValue', emptyValue);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('[post-test] Property "requiredValue" is required.'),
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('requiredValue', 'valid');
    (console.error as jest.Mock).mockClear();

    component.requiredValue = undefined;
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('[post-test] Property "requiredValue" is required.'),
      expect.any(Object),
    );
  });

  it('should not validate on property change before componentDidLoad', () => {
    component.requiredValue = undefined;
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should block subsequent validators when failing', () => {
    setPropertyInitialValue('requiredValue');

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should call the original componentDidLoad', () => {
    const originalFn = jest.fn();

    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      requiredValue: unknown = 'valid';

      componentDidLoad() {
        originalFn();
      }
    }

    const instance = new TestComponent();
    instance.componentDidLoad();
    expect(originalFn).toHaveBeenCalledTimes(1);
  });

  it('should work when no componentDidLoad is defined', () => {
    class TestComponent {
      host = { localName: 'post-test' } as HTMLElement;

      @Required()
      requiredValue: unknown;
    }

    const instance = new TestComponent();
    instance.requiredValue = undefined;
    (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('[post-test] Property "requiredValue" is required.'),
      expect.any(Object),
    );
  });

  it('should pass for non-empty values like 0, false, [], {}', () => {
    [0, false, [], {}, ' '].forEach(val => {
      setPropertyInitialValue('requiredValue', val);
    });

    expect(console.error).not.toHaveBeenCalled();
  });
});
