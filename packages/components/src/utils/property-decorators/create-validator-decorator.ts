import { isValueEmpty } from '@/utils/is-value-empty';
import { getElement } from '@stencil/core';

/**
 * Describes a property validator used by decorators created with
 * {@link createValidatorDecorator}.
 */
interface Validator {
  /** Lower values run first. */
  priority: number;
  /** Stops execution of subsequent validators for the same property when validation fails. */
  blocking: boolean;
  /** Runs validation even when the property value is considered empty. */
  validateEmptyValues?: boolean;
  /** Executes the validation logic for the given component property. */
  run: (component: object, property: string) => boolean;
}

/** Tracks prototypes whose `componentDidLoad` lifecycle has already been wrapped. */
const patchedTargets = new WeakSet<object>();
/** Tracks component instances that already completed the first load cycle. */
const loadedInstances = new WeakSet<object>();
/** Stores validators per component prototype and property name. */
const validatorsByTarget = new WeakMap<object, Map<string, Validator[]>>();
/** Stores all properties that use a validator decorator for each component prototype. */
const decoratedPropertiesByTarget = new WeakMap<object, Set<string>>();
/** Stores per-instance property values captured by dynamically created accessors. */
const propertyValuesByInstance = new WeakMap<object, Map<string, unknown>>();
/** Stores dependency relationships per prototype: dependencyProp -> Set<dependentProp>. */
const dependenciesByTarget = new WeakMap<object, Map<string, Set<string>>>();

/**
 * Returns the value for a key in a {@link WeakMap} and lazily creates it when missing.
 *
 * @template K WeakMap key type.
 * @template T WeakMap value type.
 * @param map WeakMap used as storage.
 * @param key Object key used to retrieve or initialize the value.
 * @param factory Factory creating the value when no entry exists for the key.
 * @returns Existing or newly created value associated with the key.
 */
function getOrCreate<K extends object, T>(map: WeakMap<K, T>, key: K, factory: () => T): T {
  let value = map.get(key);
  if (!value) {
    value = factory();
    map.set(key, value);
  }

  return value;
}

/**
 * Returns the mutable validator list registered for a property on a component prototype.
 *
 * @param target Component prototype where decorators were applied.
 * @param property Decorated property name.
 * @returns Validator list for the property.
 */
function getValidators(target: object, property: string): Validator[] {
  const validatorsByProperty = getOrCreate(validatorsByTarget, target, () => new Map());
  return getOrCreate(validatorsByProperty, property, () => []);
}

/**
 * Returns all property names decorated with validator decorators for a prototype.
 *
 * @param target Component prototype where decorators were applied.
 * @returns Set of decorated property names.
 */
function getDecoratedProperties(target: object): Set<string> {
  return getOrCreate(decoratedPropertiesByTarget, target, () => new Set());
}

/**
 * Returns the map containing tracked property values for a component instance.
 *
 * @param instance Component instance.
 * @returns Map keyed by property name with last assigned values.
 */
function getValuesByProperty(instance: object): Map<string, unknown> {
  return getOrCreate(propertyValuesByInstance, instance, () => new Map());
}

/**
 * Registers that `dependentProp` should be re-validated when `dependencyProp` changes.
 * Ensures the dependency property has an accessor so its setter can trigger dependents.
 */
export function registerDependency(
  target: object,
  dependencyProp: string,
  dependentProp: string,
): void {
  // Ensure dependency has an accessor so its setter can run dependent validators
  createPropertyAccessor(target, dependencyProp);

  const depsByProp = getOrCreate(dependenciesByTarget, target, () => new Map());
  const dependents = getOrCreate(depsByProp, dependencyProp, () => new Set<string>());
  dependents.add(dependentProp);
}

/**
 * Defines an accessor for a decorated property that stores values per instance and
 * triggers validation after the component first loads.
 *
 * Accessor creation is skipped when a getter already exists to avoid overriding
 * component-defined accessors.
 *
 * @param target Component prototype receiving the accessor.
 * @param property Decorated property name.
 */
function createPropertyAccessor(target: object, property: string): void {
  const descriptor = Object.getOwnPropertyDescriptor(target, property);
  if (descriptor && descriptor.get) return;

  Object.defineProperty(target, property, {
    get() {
      return getValuesByProperty(this).get(property);
    },
    set(newValue: unknown) {
      getValuesByProperty(this).set(property, newValue);
      if (loadedInstances.has(this)) {
        runValidators(this, property);
        // Run validators for any properties that depend on this property.
        const proto = Object.getPrototypeOf(this);
        const depsByProp = dependenciesByTarget.get(proto);
        if (depsByProp) {
          const dependents = depsByProp.get(property);
          if (dependents) {
            for (const dependent of dependents) {
              runValidators(this, dependent);
            }
          }
        }
      }
    },
    enumerable: true,
    configurable: true,
  });
}

/**
 * Wraps `componentDidLoad` once per prototype to execute validators on initial render.
 *
 * Existing `componentDidLoad` behavior is preserved and called after validation.
 *
 * @param target Component prototype to patch.
 */
function patchComponentDidLoad(target: object): void {
  if (patchedTargets.has(target)) return;
  patchedTargets.add(target);

  const original =
    'componentDidLoad' in target && typeof target.componentDidLoad === 'function'
      ? target.componentDidLoad
      : undefined;

  Object.defineProperty(target, 'componentDidLoad', {
    writable: true,
    configurable: true,
    value: function (...args: unknown[]) {
      loadedInstances.add(this);

      const decoratedProperties = getDecoratedProperties(Object.getPrototypeOf(this));
      for (const property of decoratedProperties) {
        runValidators(this, property);
      }

      if (original) {
        return original.apply(this, args);
      }
    },
  });
}

/**
 * Executes all validators for a property in ascending priority order.
 *
 * Validation is skipped for empty values unless a validator explicitly opts in via
 * `validateEmptyValues`. Execution stops when a blocking validator fails.
 *
 * @param component Component instance.
 * @param property Property name to validate.
 */
function runValidators(component: object, property: string): void {
  const prototype = Object.getPrototypeOf(component);
  const validatorsByProperty = validatorsByTarget.get(prototype);
  if (!validatorsByProperty) return;

  const validators = validatorsByProperty.get(property);
  if (!validators || validators.length === 0) return;

  const sortedValidators = [...validators].sort((a, b) => a.priority - b.priority);
  const value = component[property as keyof typeof component];
  const valueIsEmpty = isValueEmpty(value);

  for (const validator of sortedValidators) {
    if (valueIsEmpty && !validator.validateEmptyValues) {
      continue;
    }

    const passed = validator.run(component, property);
    if (!passed && validator.blocking) break;
  }
}

/**
 * Creates a property decorator that registers a validator for a component property.
 *
 * The returned decorator ensures property access is intercepted, initial-load
 * validation is enabled, and the provided validator is stored for execution.
 *
 * @param validator Validator definition to register.
 * @returns Property decorator compatible with TypeScript decorator syntax.
 */
export function createValidatorDecorator(
  validator: Validator,
): (target: object, property: string) => void {
  return function (target: object, property: string): void {
    createPropertyAccessor(target, property);
    patchComponentDidLoad(target);
    getDecoratedProperties(target).add(property);
    getValidators(target, property).push(validator);
  };
}

/**
 * Builds a validation context for a decorated component property.
 *
 * The returned context includes:
 * - `value`: current property value.
 * - `showError(constraint)`: helper that logs a consistent error format and includes
 *   the host element for easier debugging in browser consoles.
 *
 * Message format: `[componentName] Property "property" <constraint>. Received: <value>.`
 *
 * @param component Component instance containing the validated property.
 * @param property Property name being validated.
 * @returns Validation context used by individual validator implementations.
 */
export function getValidationContext(
  component: object,
  property: string,
): { value: unknown; showError: (constraint: string) => void } {
  const host = getElement(component);
  const componentName = host.localName;
  const value = component[property as keyof typeof component];

  return {
    value,
    showError(constraint: string) {
      console.error(
        `[${componentName}] Property "${String(property)}" ${constraint}. Received: ${JSON.stringify(value)}.`,
        host,
      );
    },
  };
}
