import { MsgType } from '@/types';

export function checkUrl<T extends { host: HTMLElement }>(
  component: T,
  prop: keyof T,
  customMessage?: string,
  msgType: MsgType = 'error',
) {
  const componentName = component.host.localName;
  const value = component[prop];

  const defaultMessage = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component is invalid.`;
  const message = customMessage || defaultMessage;

  if (typeof value !== 'string' && !(value instanceof URL)) {
    if (msgType != 'warning') {
      throw new Error(message);
    } else {
      console.warn(message);
    }
    return;
  }

  try {
    new URL(value, 'https://www.post.ch');
  } catch {
    if (msgType != 'warning') {
      throw new Error(message);
    } else {
      console.warn(message);
    }
  }
}
