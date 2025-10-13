import { PrimitiveType } from '@/types/property-types';

export function checkArrayOf<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  type: PrimitiveType,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be an \`${type}\` array.`;

  if (!Array.isArray(value) || value.some(val => typeof val !== type)) {
    console.error(message);
  }
}
