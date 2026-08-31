import { CustomConstraint } from '../custom-constraint';

describe('CustomConstraint decorator', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  describe('simple check without dependencies', () => {
    class SimpleComponent {
      @CustomConstraint(({ value }) => ((value as number) < 0 ? 'must be non-negative' : undefined))
      count: unknown;
    }

    let component: SimpleComponent;

    beforeEach(() => {
      component = new SimpleComponent();
    });

    function setPropertyInitialValue(property: keyof SimpleComponent, value: unknown) {
      component[property] = value;
      (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
    }

    it('should not log an error when check returns undefined', () => {
      setPropertyInitialValue('count', 5);
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should log an error when check returns a constraint message', () => {
      setPropertyInitialValue('count', -1);
      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "count" must be non-negative. Received: -1.',
        expect.any(Object),
      );
    });

    it.each([undefined, null, '', Number.NaN])(
      'should not validate when value is empty (%s)',
      emptyValue => {
        setPropertyInitialValue('count', emptyValue);
        expect(console.error).not.toHaveBeenCalled();
      },
    );

    it('should not validate before componentDidLoad', () => {
      component.count = -1;
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should validate on property change after componentDidLoad', () => {
      setPropertyInitialValue('count', 5);
      (console.error as jest.Mock).mockClear();

      component.count = -3;
      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "count" must be non-negative. Received: -3.',
        expect.any(Object),
      );
    });

    it('should not log an error when changing to a valid value', () => {
      setPropertyInitialValue('count', -1);
      (console.error as jest.Mock).mockClear();

      component.count = 10;
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('with dependency properties', () => {
    class RangeComponent {
      @CustomConstraint<RangeComponent>(
        ({ value, dependencies }) =>
          (value as number) < (dependencies.min as number)
            ? 'must be greater than or equal to "min"'
            : null,
        { dependsOn: ['min'] },
      )
      value: unknown;

      min: unknown;
    }

    let component: RangeComponent;

    beforeEach(() => {
      component = new RangeComponent();
    });

    function setPropertyInitialValue(property: keyof RangeComponent, value: unknown) {
      component[property] = value;
      (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
    }

    it('should pass when value satisfies the dependency check', () => {
      component.min = 5;
      setPropertyInitialValue('value', 10);
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should fail when value violates the dependency check', () => {
      component.min = 10;
      setPropertyInitialValue('value', 3);
      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "value" must be greater than or equal to "min". Received: 3.',
        expect.any(Object),
      );
    });

    it('should re-validate when dependency property changes after load', () => {
      component.min = 0;
      setPropertyInitialValue('value', 5);
      expect(console.error).not.toHaveBeenCalled();
      (console.error as jest.Mock).mockClear();

      component.min = 10;
      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "value" must be greater than or equal to "min". Received: 5.',
        expect.any(Object),
      );
    });

    it('should not log an error when dependency change makes value valid', () => {
      component.min = 10;
      setPropertyInitialValue('value', 5);
      (console.error as jest.Mock).mockClear();

      component.min = 2;
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('with dynamic constraint message', () => {
    class DynamicMessageComponent {
      @CustomConstraint<DynamicMessageComponent>(
        ({ value, dependencies }) =>
          (value as number) > (dependencies.max as number)
            ? `must be at most ${dependencies.max}`
            : null,
        { dependsOn: ['max'] },
      )
      value: unknown;

      max: unknown;
    }

    let component: DynamicMessageComponent;

    beforeEach(() => {
      component = new DynamicMessageComponent();
    });

    it('should use the dynamic message with resolved dependency values', () => {
      component.max = 100;
      component.value = 200;
      (component as unknown as { componentDidLoad: () => void }).componentDidLoad();

      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "value" must be at most 100. Received: 200.',
        expect.any(Object),
      );
    });

    it('should reflect updated dependency values in the message', () => {
      component.max = 100;
      component.value = 50;
      (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
      (console.error as jest.Mock).mockClear();

      component.max = 30;
      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "value" must be at most 30. Received: 50.',
        expect.any(Object),
      );
    });
  });

  describe('with multiple dependencies', () => {
    class MultiDepComponent {
      @CustomConstraint<MultiDepComponent>(
        ({ value, dependencies }) =>
          (value as number) < (dependencies.min as number) ||
          (value as number) > (dependencies.max as number)
            ? 'must be within the allowed range'
            : null,
        { dependsOn: ['min', 'max'] },
      )
      value: unknown;

      min: unknown;
      max: unknown;
    }

    let component: MultiDepComponent;

    beforeEach(() => {
      component = new MultiDepComponent();
    });

    it('should pass when value is within range', () => {
      component.min = 0;
      component.max = 100;
      component.value = 50;
      (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should fail when value is below min', () => {
      component.min = 10;
      component.max = 100;
      component.value = 5;
      (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "value" must be within the allowed range. Received: 5.',
        expect.any(Object),
      );
    });

    it('should re-validate when either dependency changes', () => {
      component.min = 0;
      component.max = 100;
      component.value = 50;
      (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
      (console.error as jest.Mock).mockClear();

      component.max = 30;
      expect(console.error).toHaveBeenCalledWith(
        '[post-test] Property "value" must be within the allowed range. Received: 50.',
        expect.any(Object),
      );
    });
  });
});
