export function checkOneOf<T, H extends { host: HTMLElement }>(
  component: H,
  prop: string,
  possibleValues: readonly T[],
  customMessage?: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  console.log(component);
  const defaultMessage =
    'The `' +
    prop +
    '` property of the `' +
    componentName +
    '` component must be one of the following values: `' +
    possibleValues.join(', ') +
    '`.';
  const message = customMessage || defaultMessage;

  if (!possibleValues.includes(value)) {
    throw new Error(message);
  }
}
