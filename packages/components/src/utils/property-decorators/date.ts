import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property value is a valid date string.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 */
export function DateValue() {
  return createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);
      const isValid = typeof value === 'string' && !Number.isNaN(new Date(value).getTime());

      if (!isValid) {
        showError('must be a valid date string');
        return false;
      }
      return true;
    },
  });
}
