export type PropertyType = 'boolean' | 'number' | 'string' | 'array' | 'object' | 'function';

export function checkType<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  type: PropertyType,
  customMessage?: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const typeIsArray = type === 'array';
  const valueIsArray = Array.isArray(value);

  const defaultMessage = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be of type \`
    ${type}\`.`;
  const message = customMessage || defaultMessage;

  if (typeIsArray || valueIsArray) {
    if (valueIsArray !== typeIsArray) {
      throw new Error(message);
    }
  } else if (typeof value !== type) {
    throw new Error(message);
  }
}
