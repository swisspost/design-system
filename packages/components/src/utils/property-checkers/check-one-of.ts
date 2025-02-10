export function checkOneOf<T>(
  component: any,
  prop: string,
  possibleValues: readonly T[],
  customMessage?: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];

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
