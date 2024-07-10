export function getElementInRootNode(
  elementId: string,
  elementHost: HTMLElement,
): HTMLElement | null {
  const root = elementHost.getRootNode();

  if (root instanceof Document || root instanceof ShadowRoot) {
    return root.getElementById(elementId);
  }

  return null;
}
