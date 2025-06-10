/**
 * Decorator that guards event handlers to only execute when the event meets certain criteria.
 * @param options - Configuration options for the event guard
 * @param options.targetLocalName - The local name of the element that should be the target of the event
 * @param options.delegatorSelector - Optional CSS selector to check if the event was delegated from a specific ancestor
 */
export function EventGuard(options: { targetLocalName: string; delegatorSelector?: string }) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor?: PropertyDescriptor
  ) {
    if (descriptor) {
      const originalMethod = descriptor.value;
      
      descriptor.value = function (event: CustomEvent) {
        if (!event || !event.target) return;

        const eventTarget = event.target as HTMLElement;
        
        if (eventTarget.localName !== options.targetLocalName) return;
        
        if (options.delegatorSelector) {
          const closest = shadowClosest(eventTarget, options.delegatorSelector);
          if (closest !== this.host) return;
        }

        return originalMethod.call(this, event);
      };
    } else {
      const privateKey = `__${propertyKey}_original`;
      
      Object.defineProperty(target, privateKey, {
        writable: true,
        configurable: true
      });

      Object.defineProperty(target, propertyKey, {
        get() {
          return this[privateKey];
        },
        set(originalFunction: (event: CustomEvent) => void) {
          if (typeof originalFunction === 'function') {
            this[privateKey] = (event: CustomEvent) => {
              if (!event || !event.target) return;

              const eventTarget = event.target as HTMLElement;
              
              if (eventTarget.localName !== options.targetLocalName) return;
              
              if (options.delegatorSelector) {
                const closest = shadowClosest(eventTarget, options.delegatorSelector);
                if (closest !== this.host) return;
              }

              return originalFunction.call(this, event);
            };
          } else {
            this[privateKey] = originalFunction;
          }
        },
        configurable: true,
        enumerable: true
      });
    }
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
