import { getElement } from '@stencil/core';

interface Validator {
  priority: number;
  blocking: boolean;
  run: (component: object, property: string) => boolean;
}

const patchedTargets = new WeakSet<object>();
const loadedInstances = new WeakSet<object>();
const validatorsByTarget = new WeakMap<object, Map<string, Validator[]>>();
const decoratedPropertiesByTarget = new WeakMap<object, Set<string>>();
const propertyValuesByInstance = new WeakMap<object, Map<string, unknown>>();

/** Returns or creates a value in a WeakMap for a given key. */
function getOrCreate<K extends object, T>(map: WeakMap<K, T>, key: K, factory: () => T): T {
  if (!map.has(key)) {
    map.set(key, factory());
  }

  return map.get(key)!;
}

/** Returns the list of validators registered for a property. */
function getValidators(target: object, property: string): Validator[] {
  const validatorsByProperty = getOrCreate(validatorsByTarget, target, () => new Map());
  return getOrCreate(validatorsByProperty, property, () => []);
}

/** Returns the set of property names that have been decorated. */
function getDecoratedProperties(target: object): Set<string> {
  return getOrCreate(decoratedPropertiesByTarget, target, () => new Set());
}

/** Returns the property value for a component instance. */
function getValuesByProperty(instance: object): Map<string, unknown> {
  return getOrCreate(propertyValuesByInstance, instance, () => new Map());
}

/** Defines a getter/setter on the target that triggers validation on property changes. */
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
      }
    },
    enumerable: true,
    configurable: true,
  });
}

/** Patches componentDidLoad to run validators for all decorated properties on first load. */
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

/** Executes all validators for a property in priority order, stopping if a blocking validator fails. */
function runValidators(component: object, property: string): void {
  const prototype = Object.getPrototypeOf(component);
  const validatorsByProperty = validatorsByTarget.get(prototype);
  if (!validatorsByProperty) return;

  const validators = validatorsByProperty.get(property);
  if (!validators || validators.length === 0) return;

  const sortedValidators = [...validators].sort((a, b) => a.priority - b.priority);
  for (const validator of sortedValidators) {
    const passed = validator.run(component, property);
    if (!passed && validator.blocking) break;
  }
}

/**
 * Creates a property decorator that registers a validator.
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
 * Get validation context from a component instance.
 * Includes `showError(constraint)` method that logs
 * a consistently formatted message with a reference to the host element.
 *
 * Message format: `[componentName] Property "property" <constraint>. Received: <value>.`
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
