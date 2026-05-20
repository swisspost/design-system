import { isValueEmpty } from '@/utils/is-value-empty';
import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property is not empty.
 * If the property is empty (undefined, null, '', NaN), an error is logged.
 * This validator is blocking: if it fails, subsequent validators will not run.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 */
export function Required() {
  return createValidatorDecorator({
    priority: 0,
    blocking: true,
    validateEmptyValues: true,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      if (isValueEmpty(value)) {
        showError('is required');
        return false;
      }
      return true;
    },
  });
}
