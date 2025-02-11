export function checkOneOf<T extends { host: HTMLElement }, K extends keyof T>(
  component: T,
  prop: K,
  possibleValues: readonly T[K][],
  customMessage?: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const defaultMessage = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be one of the following values: \`
    ${possibleValues.join(', ')} \`.`;

  const message = customMessage || defaultMessage;

  if (!possibleValues.includes(value)) {
    throw new Error(message);
  }
}
