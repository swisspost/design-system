import { IS_BROWSER } from './environment';

/**
 * getRootNode() can only be used after the element has been attached to the document!
 * So use it for example in the componentDidLoad lifecycle hook.
 */
export function getRoot(element: Element): Document | ShadowRoot {
  const root = IS_BROWSER ? element.getRootNode() : element;

  if (root instanceof Document || root instanceof ShadowRoot) {
    return root;
  }

  throw new Error(
    'Attempting to access root node before the element is attached to the document or shadow tree.',
  );
}
