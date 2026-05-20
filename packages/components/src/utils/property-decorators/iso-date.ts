import { isIsoDate } from '../is-iso-date';
import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property value is a date in ISO 8601 format (YYYY-MM-DD).
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 */
export function IsoDate() {
  return createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      if (!isIsoDate(String(value))) {
        showError('must be in ISO format (YYYY-MM-DD)');
        return false;
      }
      return true;
    },
  });
}
