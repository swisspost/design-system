import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property value matches a regular expression.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 *
 * @param pattern - The regex pattern the property value must match.
 */
export function Pattern(pattern: RegExp) {
  return createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      if (typeof value !== 'string' || !pattern.test(value)) {
        showError(`must match ${pattern}`);
        return false;
      }
      return true;
    },
  });
}
