import { checkType } from './check-type';

export function checkGreaterThan<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  minimum: number,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  checkType(component, prop, 'number');

  if (typeof value !== 'number') {
    return;
  }

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be greater than \`${minimum}\`.`;

  if (value <= minimum) {
    console.error(message);
  }
}
