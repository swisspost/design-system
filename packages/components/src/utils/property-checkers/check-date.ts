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

  // Try ISO format first, then EU format (dd.mm.yyyy)
  const isoDate = new Date(value);
  const [d, m, y] = value.split('.');
  const euDate = new Date(+y, +m - 1, +d);

  if (isNaN(isoDate.getTime()) && isNaN(euDate.getTime())) {
    console.error(message);
  }
}
