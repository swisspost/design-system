import { PrimitiveType } from '@/types/property-types';
import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property value is an array of the specified type.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 *
 * @param type - The expected type of each array element ('boolean', 'number', 'string').
 */
export function ArrayOf(type: PrimitiveType) {
  return createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      if (!Array.isArray(value) || value.some(val => typeof val !== type)) {
        showError(`must be a "${type}" array`);
        return false;
      }
      return true;
    },
  });
}
