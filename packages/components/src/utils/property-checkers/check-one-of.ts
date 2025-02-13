export function checkOneOf<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  possibleValues: readonly unknown[],
  customMessage?: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];
  console.log(value);
  const defaultMessage = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be one of the following values: ${possibleValues.join(
    ', ',
  )}.`;

  const message = customMessage || defaultMessage;
  if (!possibleValues.includes(value)) {
    throw new Error(message);
  }
}
