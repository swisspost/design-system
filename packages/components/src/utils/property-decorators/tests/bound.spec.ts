import { GreaterThan, LessThan } from '../bound';

function setPropertyInitialValueHelper<T extends object>(
  component: T,
  property: keyof T,
  value: unknown,
) {
  component[property] = value as T[keyof T];
  (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
}

export function runValidatorLifecycleTests<T extends object>(
  getComponent: () => T,
  setPropertyInitialValue: (property: keyof T, value: unknown) => void,
  property: keyof T,
) {
  describe('lifecycle', () => {
    it('should not validate before componentDidLoad', () => {
      const component = getComponent();
      component[property] = 5 as unknown as T[keyof T];
      expect(console.error).not.toHaveBeenCalled();
    });

    it.each([undefined, null, '', Number.NaN])(
      'should not log an error when value is empty (%s)',
      emptyValue => {
        setPropertyInitialValue(property, emptyValue);
        expect(console.error).not.toHaveBeenCalled();
      },
    );

    it('should ignore non-numeric values', () => {
      setPropertyInitialValue(property, 'not-a-number');
      expect(console.error).not.toHaveBeenCalled();
    });
  });
}

interface BoundTestConfig {
  decoratorName: string;
  decorator: (bound: number | string, options?: object) => PropertyDecorator;
  inclusionOptionKey: string;
  hardcodedBound: number;
  dynamicBoundProp: string;
  dynamicBoundValue: number;
  defaultIncludesEquality: boolean;
  values: {
    valid: number;
    validFar: number;
    boundary: number;
    invalid: number;
    exclusiveValid: number;
    dynamicValid: number;
    reducedBoundValid: number;
  };
  reducedBound: number;
  messages: {
    exclusive: (bound: number, received: number) => string;
    inclusive: (bound: number, received: number) => string;
  };
}

const configs: BoundTestConfig[] = [
  {
    decoratorName: 'GreaterThan',
    decorator: (bound, options) => GreaterThan(bound as number, options),
    inclusionOptionKey: 'includeMin',
    hardcodedBound: 10,
    dynamicBoundProp: 'minValue',
    dynamicBoundValue: 20,
    defaultIncludesEquality: false,
    reducedBound: 5,
    values: {
      valid: 15,
      validFar: 100,
      boundary: 10,
      invalid: 5,
      exclusiveValid: 14,
      dynamicValid: 25,
      reducedBoundValid: 10,
    },
    messages: {
      exclusive: (bound, received) =>
        `[post-test] Property "value" must be greater than "${bound}". Received: ${received}.`,
      inclusive: (bound, received) =>
        `[post-test] Property "value" must be greater than or equal to "${bound}". Received: ${received}.`,
    },
  },
  {
    decoratorName: 'LessThan',
    decorator: (bound, options) => LessThan(bound as number, options),
    inclusionOptionKey: 'includeMax',
    hardcodedBound: 15,
    dynamicBoundProp: 'maxValue',
    dynamicBoundValue: 15,
    defaultIncludesEquality: true,
    reducedBound: 20,
    values: {
      valid: 10,
      validFar: 1,
      boundary: 15,
      invalid: 20,
      exclusiveValid: 14,
      dynamicValid: 10,
      reducedBoundValid: 3,
    },
    messages: {
      exclusive: (bound, received) =>
        `[post-test] Property "value" must be less than "${bound}". Received: ${received}.`,
      inclusive: (bound, received) =>
        `[post-test] Property "value" must be less than or equal to "${bound}". Received: ${received}.`,
    },
  },
];

function createDecoratedComponent(config: BoundTestConfig) {
  const { decorator, inclusionOptionKey, hardcodedBound, dynamicBoundProp, dynamicBoundValue } =
    config;

  class DecoratedComponent {
    @(decorator(hardcodedBound) as PropertyDecorator) value: unknown = undefined;
    @(decorator(hardcodedBound, {
      [inclusionOptionKey]: !config.defaultIncludesEquality,
    }) as PropertyDecorator)
    valueToggled: unknown = undefined;
    @(decorator(dynamicBoundProp) as PropertyDecorator) dynamicValue: unknown = undefined;
    @(decorator(dynamicBoundProp, {
      [inclusionOptionKey]: !config.defaultIncludesEquality,
    }) as PropertyDecorator)
    dynamicValueToggled: unknown = undefined;
    [dynamicBoundProp] = dynamicBoundValue;
  }

  return new DecoratedComponent();
}

configs.forEach(config => {
  describe(`${config.decoratorName} decorator`, () => {
    let component: ReturnType<typeof createDecoratedComponent>;

    beforeEach(() => {
      component = createDecoratedComponent(config);
      console.error = jest.fn();
    });

    function setPropertyInitialValue(property: string, value: unknown) {
      setPropertyInitialValueHelper(component, property as keyof typeof component, value);
    }

    describe('hardcoded bound (default behavior)', () => {
      it('should not log an error when value is valid', () => {
        setPropertyInitialValue('value', config.values.valid);
        expect(console.error).not.toHaveBeenCalled();
      });

      it('should not log an error when value is far from bound', () => {
        setPropertyInitialValue('value', config.values.validFar);
        expect(console.error).not.toHaveBeenCalled();
      });

      if (config.defaultIncludesEquality) {
        it('should not log an error when value equals bound (inclusive by default)', () => {
          setPropertyInitialValue('value', config.values.boundary);
          expect(console.error).not.toHaveBeenCalled();
        });
      } else {
        it('should log an error when value equals bound (exclusive by default)', () => {
          setPropertyInitialValue('value', config.values.boundary);
          expect(console.error).toHaveBeenCalledWith(
            config.messages.exclusive(config.hardcodedBound, config.values.boundary),
            expect.any(Object),
          );
        });
      }

      it('should log an error when value violates bound', () => {
        setPropertyInitialValue('value', config.values.invalid);
        expect(console.error).toHaveBeenCalledWith(
          config.defaultIncludesEquality
            ? config.messages.inclusive(config.hardcodedBound, config.values.invalid)
            : config.messages.exclusive(config.hardcodedBound, config.values.invalid),
          expect.any(Object),
        );
      });
    });

    describe('toggled inclusion', () => {
      if (config.defaultIncludesEquality) {
        it('should log an error when value equals bound (toggled to exclusive)', () => {
          setPropertyInitialValue('valueToggled', config.values.boundary);
          expect(console.error).toHaveBeenCalledWith(
            config.messages
              .exclusive(config.hardcodedBound, config.values.boundary)
              .replace('"value"', '"valueToggled"'),
            expect.any(Object),
          );
        });

        it('should not log an error when value is strictly valid', () => {
          setPropertyInitialValue('valueToggled', config.values.exclusiveValid);
          expect(console.error).not.toHaveBeenCalled();
        });
      } else {
        it('should not log an error when value equals bound (toggled to inclusive)', () => {
          setPropertyInitialValue('valueToggled', config.values.boundary);
          expect(console.error).not.toHaveBeenCalled();
        });

        it('should log an error when value violates bound', () => {
          setPropertyInitialValue('valueToggled', config.values.invalid);
          expect(console.error).toHaveBeenCalledWith(
            config.messages
              .inclusive(config.hardcodedBound, config.values.invalid)
              .replace('"value"', '"valueToggled"'),
            expect.any(Object),
          );
        });
      }
    });

    describe('property reference bound', () => {
      it('should not log an error when value is valid relative to referenced property', () => {
        setPropertyInitialValue('dynamicValue', config.values.dynamicValid);
        expect(console.error).not.toHaveBeenCalled();
      });

      it('should log an error when value violates referenced property bound', () => {
        const boundProp = config.dynamicBoundProp;
        const boundVal = config.dynamicBoundValue;

        // Set a value that violates the bound
        const violatingValue = config.defaultIncludesEquality
          ? boundVal + 10 // exceeds max for LessThan
          : boundVal; // equals min for GreaterThan (exclusive by default)

        setPropertyInitialValue('dynamicValue', violatingValue);

        const expectedMsg = config.defaultIncludesEquality
          ? config.messages.inclusive(boundVal, violatingValue)
          : config.messages.exclusive(boundVal, violatingValue);

        expect(console.error).toHaveBeenCalledWith(
          expectedMsg.replace('"value"', '"dynamicValue"'),
          expect.any(Object),
        );
      });

      it('should use dynamic value from property', () => {
        component[config.dynamicBoundProp] = config.reducedBound;
        setPropertyInitialValue('dynamicValue', config.values.reducedBoundValid);
        expect(console.error).not.toHaveBeenCalled();
      });

      it('should respect toggled inclusion on referenced bound', () => {
        const boundVal = config.dynamicBoundValue;
        component[config.dynamicBoundProp] = boundVal;

        // With toggled inclusion, boundary value behavior flips
        setPropertyInitialValue('dynamicValueToggled', boundVal);

        if (config.defaultIncludesEquality) {
          // Default is inclusive, toggled to exclusive → boundary value should fail
          const msg = config.messages
            .exclusive(boundVal, boundVal)
            .replace('"value"', '"dynamicValueToggled"');
          expect(console.error).toHaveBeenCalledWith(msg, expect.any(Object));
        } else {
          // Default is exclusive, toggled to inclusive → boundary value should pass
          expect(console.error).not.toHaveBeenCalled();
        }
      });

      it('should log error when referenced property is not a number', () => {
        component[config.dynamicBoundProp] = 'not-a-number';
        setPropertyInitialValue('dynamicValue', config.values.valid);
        expect(console.error).toHaveBeenCalledWith(
          `[post-test] Property "dynamicValue" references property "${config.dynamicBoundProp}" which must be a number but got string. Received: ${config.values.valid}.`,
          expect.any(Object),
        );
      });
    });

    describe('property changes', () => {
      it('should validate on property change after componentDidLoad', () => {
        setPropertyInitialValue('value', config.values.valid);
        (console.error as jest.Mock).mockClear();

        component.value = config.values.invalid;
        const msg = config.defaultIncludesEquality
          ? config.messages.inclusive(config.hardcodedBound, config.values.invalid)
          : config.messages.exclusive(config.hardcodedBound, config.values.invalid);
        expect(console.error).toHaveBeenCalledWith(msg, expect.any(Object));
      });

      it('should not log an error when changing to a valid value', () => {
        setPropertyInitialValue('value', config.values.invalid);
        (console.error as jest.Mock).mockClear();

        component.value = config.values.valid;
        expect(console.error).not.toHaveBeenCalled();
      });

      it('should re-validate dependents when referenced bound changes', () => {
        setPropertyInitialValue('dynamicValue', config.values.valid);
        (console.error as jest.Mock).mockClear();

        // Change the bound so the current value becomes invalid
        const newBound = config.defaultIncludesEquality
          ? config.values.valid - 5 // lower max below current value (LessThan)
          : config.values.valid + 5; // raise min above current value (GreaterThan)

        component[config.dynamicBoundProp] = newBound;

        const msg = config.defaultIncludesEquality
          ? config.messages.inclusive(newBound, config.values.valid as number)
          : config.messages.exclusive(newBound, config.values.valid as number);
        expect(console.error).toHaveBeenCalledWith(
          msg.replace('"value"', '"dynamicValue"'),
          expect.any(Object),
        );
      });

      it('should not log an error when dependent becomes valid after bound change', () => {
        setPropertyInitialValue('dynamicValue', config.values.invalid);
        (console.error as jest.Mock).mockClear();

        // Change the bound so the current value becomes valid
        const newBound = config.defaultIncludesEquality
          ? config.values.invalid + 5 // raise max above current value (LessThan)
          : config.values.invalid - 5; // lower min below current value (GreaterThan)

        component[config.dynamicBoundProp] = newBound;
        expect(console.error).not.toHaveBeenCalled();
      });
    });

    runValidatorLifecycleTests(() => component, setPropertyInitialValue, 'value');
  });
});
