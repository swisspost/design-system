export function checkUrl(component: any, prop: string, customMessage?: string) {
  const componentName = component.host.localName;
  const value = component[prop];

  const defaultMessage =
    'The `' + prop + '` property of the `' + componentName + '` component is invalid.';
  const message = customMessage || defaultMessage;

  if (typeof value !== 'string' && !(value instanceof URL)) {
    throw new Error(message);
  }

  try {
    new URL(value);
  } catch (e) {
    throw new Error(message);
  }
}
