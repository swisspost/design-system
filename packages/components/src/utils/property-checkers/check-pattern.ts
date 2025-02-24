export function checkPattern<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  pattern: RegExp,
  customMessage: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const defaultMessage = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be follow the format \`${pattern}\`.`;
  const message = customMessage || defaultMessage;

  if (typeof value !== 'string' || !pattern.test(value)) {
    throw new Error(message);
  }
}
