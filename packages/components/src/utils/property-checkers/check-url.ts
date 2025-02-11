export function checkUrl<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  customMessage?: string,
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const defaultMessage = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component is invalid.`;
  const message = customMessage || defaultMessage;

  if (typeof value !== 'string' && !(value instanceof URL)) {
    throw new Error(message);
  }

  try {
    new URL(value, window.location.href);
  } catch {
    throw new Error(customMessage);
  }
}
