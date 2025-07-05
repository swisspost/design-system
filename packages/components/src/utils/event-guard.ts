export function eventGuard(
  host: HTMLElement,
  event: CustomEvent,
  options: { targetLocalName: string; delegatorSelector?: string },
  callback: () => void
): void {
  const target = event.target as HTMLElement | null;

  if (!target) return;

  if (target.localName === options.targetLocalName) {
    if (!options.delegatorSelector || shadowClosest(target, options.delegatorSelector) === host) {
      callback();
    }
  }
}

/**
 * Traverses up the DOM (including crossing shadow DOM boundaries) starting from the given element
 * to find and return the closest ancestor that matches the specified CSS selector.
 * If no matching element is found, returns null.
 *
 * @param element - The starting element from which the search begins.
 * @param selector - The CSS selector used to test each ancestor element.
 * @returns The closest matching ancestor element or null if none is found.
 */
function shadowClosest(element: Element, selector: string): Element | null {
  let currentElement: Element | null = element;
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }

    const parent = currentElement.parentElement;
    if (parent) {
      currentElement = parent;
    } else {
      const parentNode = currentElement.parentNode;
      // When no parentElement exists, check if the current element is inside a shadow DOM.
      // If so, move up to the shadow host to continue the search outside the shadow boundary.
      if (parentNode instanceof ShadowRoot) {
        currentElement = parentNode.host;
      } else {
        currentElement = null;
      }
    }
  }
  return null;
}
