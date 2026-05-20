import { createValidatorDecorator, getValidationContext } from './create-validator-decorator';

/**
 * Property decorator that validates the property value is a valid URL.
 *
 * Validation runs on `componentDidLoad` and whenever the property value changes.
 */
export function Url() {
  return createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);
      let isValid = typeof value === 'string' || value instanceof URL;

      if (isValid) {
        try {
          new URL(value as string | URL, 'https://www.post.ch');
        } catch {
          isValid = false;
        }
      }

      if (!isValid) {
        showError('must be a valid URL');
        return false;
      }
      return true;
    },
  });
}
