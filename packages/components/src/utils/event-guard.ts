/**
 * Decorator that guards event handlers to only execute when the event meets certain criteria.
 * @param options - Configuration options for the event guard
 * @param options.targetLocalName - The local name of the element that should be the target of the event
 * @param options.delegatorSelector - Optional CSS selector to check if the event was delegated from a specific ancestor
 */
export function EventGuard(options: { targetLocalName: string; delegatorSelector?: string }) {
  return function (
    _target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (event: CustomEvent) {
      // Check if event is properly defined
      if (!event || !event.target) return;

      const target = event.target as HTMLElement;
      
      // Verify target matches the expected element type
      if (target.localName !== options.targetLocalName) return;

      // If delegator selector is provided, verify event originated from within the correct component
      if (options.delegatorSelector) {
        const closest = shadowClosest(target, options.delegatorSelector);
        if (closest !== this.host) return;
      }

      // All checks passed, call original method
      return originalMethod.call(this, event);
    };

    return descriptor;
  };
}

/**
 * Traverses up the DOM (including crossing shadow DOM boundaries) to find the closest ancestor
 * that matches the specified CSS selector.
 * @param element - The starting element
 * @param selector - CSS selector to match
 * @returns The closest matching ancestor or null if none found
 */
function shadowClosest(element: Element, selector: string): Element | null {
  let current: Element | null = element;
  while (current) {
    if (current.matches(selector)) {
      return current;
    }

    // Check regular parent first
    if (current.parentElement) {
      current = current.parentElement;
    } 
    // If no parentElement, check if we're in a shadow root
    else if (current.parentNode instanceof ShadowRoot) {
      current = current.parentNode.host;
    } 
    // No more parents to check
    else {
      current = null;
    }
  }
  return null;
}
