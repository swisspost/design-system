import { isValueEmpty } from '../is-value-empty';

export function checkPattern<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  pattern: RegExp,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  if (isValueEmpty(value)) {
    return;
  }

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must follow the format \`${pattern}\`.`;

  if (typeof value !== 'string' || !pattern.test(value)) {
    throw new Error(message);
  }
}
