import {
  createValidatorDecorator,
  getValidationContext,
  registerDependency,
} from './create-validator-decorator';

type BoundValidatorOptions = {
  include?: boolean;
};

type BoundValidatorConfig = {
  includeDefault: boolean;
  compare: (value: number, bound: number, include: boolean) => boolean;
  formatExpectation: (display: string, include: boolean) => string;
};

function resolveBound(component: object, bound: number | string): number | null {
  const resolvedValue =
    typeof bound === 'string' ? component[bound as keyof typeof component] : bound;

  return typeof resolvedValue === 'number' ? resolvedValue : null;
}

function createBoundValidatorDecorator<T extends object>(
  bound: number | Extract<keyof T, string>,
  options: BoundValidatorOptions,
  config: BoundValidatorConfig,
) {
  const decorator = createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      if (typeof value !== 'number') {
        return true;
      }

      const resolvedBound = resolveBound(component, bound);

      if (resolvedBound === null) {
        if (typeof bound === 'string') {
          const boundVal = component[bound as keyof typeof component];
          const boundType = typeof boundVal;
          if (boundType !== 'number') {
            showError(`references property "${bound}" which must be a number but got ${boundType}`);
            return false;
          }
        }
        return true;
      }

      const include = options.include ?? config.includeDefault;
      if (!config.compare(value, resolvedBound, include)) {
        const displayBound = typeof bound === 'string' ? String(resolvedBound) : String(bound);
        const expectation = config.formatExpectation(displayBound, include);
        showError(`must be ${expectation}`);
        return false;
      }

      return true;
    },
  }) as (target: T, property: string) => void;

  return function (target: T, property: string): void {
    if (typeof bound === 'string') {
      registerDependency(target, bound, property);
    }

    decorator(target, property);
  };
}

/**
 * Options for the GreaterThan decorator validation.
 *
 * @property includeMin - Whether the minimum value is inclusive (default: false for exclusive behavior).
 */
export type GreaterThanOptions = {
  includeMin?: boolean;
};

/**
 * Property decorator that validates the property value is greater than the specified minimum.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 *
 * @typeParam T - Component type used to constrain property-name bounds.
 * @param minimum - The minimum allowed value (exclusive by default) or property name to read it from.
 * @param options - Configuration object with `includeMin` flag (default: false for exclusive behavior).
 */
export function GreaterThan<T extends object>(
  minimum: number | Extract<keyof T, string>,
  options: GreaterThanOptions = {},
) {
  return createBoundValidatorDecorator<T>(
    minimum,
    { include: options.includeMin },
    {
      includeDefault: false,
      compare: (value, bound, include) => (include ? value >= bound : value > bound),
      formatExpectation: (display, include) =>
        include ? `greater than or equal to "${display}"` : `greater than "${display}"`,
    },
  );
}

/**
 * Options for the LessThan decorator validation.
 *
 * @property includeMax - Whether the maximum value is inclusive (default: true).
 */
export type LessThanOptions = {
  includeMax?: boolean;
};

/**
 * Property decorator that validates the property value is less than the specified maximum.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 *
 * @typeParam T - Component type used to constrain property-name bounds.
 * @param maximum - The maximum allowed value (inclusive by default) or property name to read it from.
 * @param options - Configuration object with `includeMax` flag (default: true for inclusive behavior).
 */
export function LessThan<T extends object>(
  maximum: number | Extract<keyof T, string>,
  options: LessThanOptions = {},
) {
  return createBoundValidatorDecorator<T>(
    maximum,
    { include: options.includeMax },
    {
      includeDefault: true,
      compare: (value, bound, include) => (include ? value <= bound : value < bound),
      formatExpectation: (display, include) =>
        include ? `less than or equal to "${display}"` : `less than "${display}"`,
    },
  );
}
