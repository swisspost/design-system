export function checkDate<T extends { host: HTMLElement }>(component: T, prop: keyof T) {
  const componentName = component.host.localName;
  const value = component[prop];

  const message = `The prop \`${String(
    prop,
  )}\` of the \`${componentName}\` component must be a valid date.`;

  if (typeof value !== 'string') {
    console.error(message);
    return;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    console.error(message);
  }
}
