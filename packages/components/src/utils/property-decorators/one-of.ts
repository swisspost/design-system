import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property value is one of the allowed values.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 *
 * @param possibleValues - The array of allowed values for the property.
 */
export function OneOf(possibleValues: readonly unknown[]) {
  return createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      if (!possibleValues.includes(value)) {
        showError(`must be one of [${possibleValues.join(', ')}]`);
        return false;
      }
      return true;
    },
  });
}
