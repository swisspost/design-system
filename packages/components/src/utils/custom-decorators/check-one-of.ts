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
      const value = this[prop];
      const defaultMessage = `The prop \`${String(
        prop,
      )}\` of the \`${componentName}\` component must be one of the following values: ${possibleValues.join(', ')}.`;
      console.log(
        `%c[@CheckOneOf decorator]%c → %c${String(prop)} = ${String(value)}`,
        'background: #ffcc00; color: black; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'color: #888;',
        'color: #007acc; font-weight: bold;'
      );
      
      const message = customMessage || defaultMessage;

      if (!possibleValues.includes(value)) {
        throw new Error(message);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
