export function getElementInRootNode(
  elementId: string,
  elementHost: HTMLElement,
): HTMLElement | null {
  const root = elementHost.getRootNode();

  if (root instanceof Document || root instanceof ShadowRoot) {
    const ref = root.getElementById(elementId);
    if (ref) return ref;
  }

  return null;
}
