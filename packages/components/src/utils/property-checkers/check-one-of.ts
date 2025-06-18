export function checkOneOf<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  possibleValues: readonly unknown[],
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be one of the following values: ${possibleValues.join(
    ', ',
  )}.`;

  if (!possibleValues.includes(value)) {
    console.error(message);
  }
}
