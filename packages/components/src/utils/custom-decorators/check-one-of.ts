export function CheckOneOf<T extends { host: HTMLElement }>(
  prop: keyof T,
  possibleValues: readonly unknown[],
  customMessage?: string,
) {
  return function (
    _target: T,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const componentName = this.host?.localName;
      console.log(componentName);
      const value = this[prop];
      const defaultMessage = `The prop \`${String(
        prop,
      )}\` of the \`${componentName}\` component must be one of the following values: ${possibleValues.join(', ')}.`;
      console.log(`[CheckOneOf] Validating ${String(prop)} =`, value);
      const message = customMessage || defaultMessage;

      if (!possibleValues.includes(value)) {
        throw new Error(message);
      }

      // Run original method
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
