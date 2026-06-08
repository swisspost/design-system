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

      @Required() requiredValue: unknown = 'valid';

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

      @Required() requiredValue: unknown;
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

describe('Required decorator with conditional `when` option', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  describe('when: prop, truthy: true (default)', () => {
    class ConditionalComponent {
      @Required<ConditionalComponent>({ when: 'enabled', truthy: true })
      label: unknown;

      enabled: boolean = false;
    }

    it('should skip validation when `when` prop does not match truthy', () => {
      const instance = new ConditionalComponent();
      instance.enabled = false;
      instance.label = undefined;
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).not.toHaveBeenCalled();
    });

    it('should validate when `when` prop matches truthy', () => {
      const instance = new ConditionalComponent();
      instance.enabled = true;
      instance.label = undefined;
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[post-test] Property "label" is required.'),
        expect.any(Object),
      );
    });

    it('should not log an error when `when` prop matches and value is set', () => {
      const instance = new ConditionalComponent();
      instance.enabled = true;
      instance.label = 'Hello';
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('when: prop, truthy: false', () => {
    class InlineComponent {
      @Required<InlineComponent>({ when: 'inline', truthy: false })
      toggleLabel: unknown;

      inline: boolean = false;
    }

    it('should validate when `when` prop equals the truthy value (false)', () => {
      const instance = new InlineComponent();
      instance.inline = false;
      instance.toggleLabel = undefined;
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[post-test] Property "toggleLabel" is required.'),
        expect.any(Object),
      );
    });

    it('should skip validation when `when` prop does not equal truthy (false)', () => {
      const instance = new InlineComponent();
      instance.inline = true;
      instance.toggleLabel = undefined;
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).not.toHaveBeenCalled();
    });

    it('should not log an error when condition matches and value is set', () => {
      const instance = new InlineComponent();
      instance.inline = false;
      instance.toggleLabel = 'Toggle';
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('reactive re-validation via dependency tracking', () => {
    class ReactiveComponent {
      @Required<ReactiveComponent>({ when: 'active', truthy: true })
      name: unknown;

      active: boolean = false;
    }

    it('should re-validate when the dependency prop changes after load', () => {
      const instance = new ReactiveComponent();
      instance.active = false;
      instance.name = undefined;
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      // No error initially since active is false
      expect(console.error).not.toHaveBeenCalled();

      // Change the dependency prop — should trigger re-validation of `name`
      instance.active = true;
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[post-test] Property "name" is required.'),
        expect.any(Object),
      );
    });

    it('should not error when dependency changes but value is provided', () => {
      const instance = new ReactiveComponent();
      instance.active = false;
      instance.name = 'Alice';
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).not.toHaveBeenCalled();

      instance.active = true;
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should clear requirement when dependency changes away from truthy', () => {
      const instance = new ReactiveComponent();
      instance.active = true;
      instance.name = undefined;
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).toHaveBeenCalledTimes(1);
      (console.error as jest.Mock).mockClear();

      // Setting active to false should re-validate and pass (condition no longer met)
      instance.active = false;
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('without options (unconditional)', () => {
    class SimpleComponent {
      @Required() value: unknown;
    }

    it('should always validate regardless of other properties', () => {
      const instance = new SimpleComponent();
      instance.value = undefined;
      (instance as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[post-test] Property "value" is required.'),
        expect.any(Object),
      );
    });
  });
});
