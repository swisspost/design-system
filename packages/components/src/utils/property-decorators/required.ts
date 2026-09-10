import { isValueEmpty } from '@/utils/is-value-empty';
import {
  createValidatorDecorator,
  getValidationContext,
  registerDependency,
} from './create-validator-decorator';

interface RequiredDecoratorOptions<T extends object> {
  when: Extract<keyof T, string>;
  truthy?: boolean;
}

/**
 * Property decorator that validates the property is not empty.
 * If the property is empty (undefined, null, '', NaN), an error is logged.
 * This validator is blocking: if it fails, subsequent validators will not run.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 *
 * @param options - Optional configuration.
 * @param options.when - The property name to watch. Validation only runs when this property's value matches the `truthy` option.
 * @param options.truthy - The value that the `when` property must match for validation to run. Defaults to `true`.
 */
export function Required<T extends object>(options?: RequiredDecoratorOptions<T>) {
  const validator = createValidatorDecorator({
    priority: 0,
    blocking: true,
    validateEmptyValues: true,
    run(component, property) {
      if (options && typeof options.when === 'string') {
        const truthy = options.truthy ?? true;
        if (component[options.when as keyof typeof component] !== truthy) {
          return true;
        }
      }

      const { value, showError } = getValidationContext(component, property);

      if (isValueEmpty(value)) {
        showError('is required');
        return false;
      }

      return true;
    },
  });

  return function (target: T, property: string): void {
    validator(target, property);

    if (options?.when) {
      registerDependency(target, options.when, property);
    }
  };
}
