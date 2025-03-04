export function getRoot(element: Element): Document | ShadowRoot {
  const root = element.getRootNode();

  if (root instanceof Document || root instanceof ShadowRoot) {
    return root;
  }

  throw new Error(
    'Attempting to access root node before the element is attached to the document or shadow tree.',
  );
}
