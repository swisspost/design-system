import { PropertyType } from '@/types/property-types';
import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property value is of the specified type.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 *
 * @param type - The expected type ('boolean', 'number', 'string', 'array', 'object', 'function').
 */
export function Type(type: PropertyType) {
  return createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      const typeIsArray = type === 'array';
      const valueIsArray = Array.isArray(value);
      const isValid =
        typeIsArray || valueIsArray ? valueIsArray === typeIsArray : typeof value === type;

      if (!isValid) {
        showError(`must be of type "${type}"`);
        return false;
      }
      return true;
    },
  });
}
