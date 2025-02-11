import { EMPTY_VALUES } from './constants';

export function checkNonEmpty<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  customMessage?: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];
  const defaultMessage = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component is required.`;

  const message = customMessage || defaultMessage;

  if (EMPTY_VALUES.some(v => v === value)) {
    throw new Error(message);
  }
}
