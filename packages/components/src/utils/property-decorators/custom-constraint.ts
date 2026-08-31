import {
  createValidatorDecorator,
  getValidationContext,
  registerDependency,
} from './create-validator-decorator';

interface CustomConstraintContext {
  value: unknown;
  dependencies: Record<string, unknown>;
}

interface CustomConstraintOptions<T extends object> {
  dependsOn?: Extract<keyof T, string>[];
}

/**
 * Property decorator that validates a property using a custom check function.
 *
 * The check function receives the property value and any dependency values.
 * It returns a constraint message string when the value is **invalid**.
 *
 * Validation runs on `componentDidLoad` and whenever the property or a dependency changes.
 *
 * @typeParam T - Component type used to constrain dependency property names.
 * @param check - Returns a constraint message when invalid.
 * @param options - Optional configuration with `dependencies` listing dependency property names.
 */
export function CustomConstraint<T extends object>(
  check: (context: CustomConstraintContext) => string | void,
  options?: CustomConstraintOptions<T>,
) {
  const dependencies = options?.dependsOn ?? [];

  const decorator = createValidatorDecorator({
    priority: 1,
    blocking: false,
    run(component, property) {
      const { value, showError } = getValidationContext(component, property);

      const dependencyRecord: Record<string, unknown> = {};
      for (const dependency of dependencies) {
        dependencyRecord[dependency] = component[dependency as keyof typeof component];
      }

      const constraint = check({ value, dependencies: dependencyRecord });

      if (constraint) {
        showError(constraint);
        return false;
      }

      return true;
    },
  }) as (target: T, property: string) => void;

  return function (target: T, property: string): void {
    for (const dependency of dependencies) {
      registerDependency(target, dependency, property);
    }

    decorator(target, property);
  };
}
