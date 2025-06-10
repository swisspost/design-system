import { PropertyType } from '@/types/property-types';

export function checkType<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  type: PropertyType,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const typeIsArray = type === 'array';
  const valueIsArray = Array.isArray(value);

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be of type \`${type}\`.`;

  if (typeIsArray || valueIsArray) {
    if (valueIsArray !== typeIsArray) {
      throw new Error(message);
    }
  } else if (typeof value !== type) {
    throw new Error(message);
  }
}
