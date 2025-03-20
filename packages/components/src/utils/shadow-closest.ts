export function shadowClosest(element: Element, selector: string): Element | null {
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
        if (parentNode instanceof ShadowRoot) {
          currentElement = parentNode.host;
        } else {
          currentElement = null;
        }
      }
    }
    return null;
  }
  