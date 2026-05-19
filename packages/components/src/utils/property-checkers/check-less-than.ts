import { checkType } from './check-type';

export function checkLessThan<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  maximum: number,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  checkType(component, prop, 'number');

  if (typeof value !== 'number') {
    return;
  }

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be less than \`${maximum}\`.`;

  if (value >= maximum) {
    console.error(message);
  }
}
