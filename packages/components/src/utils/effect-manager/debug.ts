function describeElement(element: Element): string {
  const id = element.id ? `#${element.id}` : '';
  return `<${element.localName}${id}>`;
}

function describeObject(value: object): string {
  return value.constructor?.name || 'Object';
}

export function describeContext(context: object): string {
  return context instanceof Element ? describeElement(context) : describeObject(context);
}

export function describeTarget(target: unknown): string {
  if (target === null || target === undefined) return String(target);
  if (target === globalThis) return 'window';
  if (target === globalThis.document) return 'document';
  if (target instanceof Element) return describeElement(target);
  if (target instanceof ShadowRoot) return `shadow root of ${describeElement(target.host)}`;
  if (typeof target === 'object') return describeObject(target);

  return String(target);
}
