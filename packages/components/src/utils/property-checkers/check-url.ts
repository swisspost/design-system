import { ComponentInterface } from '@stencil/core/internal';

export function checkUrl(component: ComponentInterface, prop: string, customMessage?: string) {
  const componentName = component.host.localName;
  const value = component[prop];

  const defaultMessage =
    'The `' + prop + '` property of the `' + componentName + '` component is invalid.';
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
