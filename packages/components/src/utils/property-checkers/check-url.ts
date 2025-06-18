export function checkUrl<T extends { host: HTMLElement }>(component: T, prop: keyof T) {
  const componentName = component.host.localName;
  const value = component[prop];

  const message = `The prop \`${String(prop)}\` of the \`${componentName}\` component is invalid.`;

  if (typeof value !== 'string' && !(value instanceof URL)) {
    console.error(message);
    return;
  }

  try {
    new URL(value, 'https://www.post.ch');
  } catch {
    console.error(message);
  }
}
