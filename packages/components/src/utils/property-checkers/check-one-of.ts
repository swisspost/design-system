import { isValueEmpty } from '../is-value-empty';

export function checkOneOf<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  possibleValues: readonly unknown[],
) {
  const componentName = component.host.localName;
  const value = component[prop];

  if (isValueEmpty(value)) {
    return;
  }

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be one of the following values: ${possibleValues.join(
    ', ',
  )}.`;

  if (!possibleValues.includes(value)) {
    throw new Error(message);
  }
}
