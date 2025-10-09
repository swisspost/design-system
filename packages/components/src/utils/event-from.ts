/**
 * Validates if an event should be processed based on target and nesting criteria
 * @param event - The event to validate
 * @param tag - The expected local name of the event target
 * @param host - The host element for nested component checking
 * @param ignoreNestedComponents - Whether to ignore events from nested components
 * @returns true if the event should be processed, false otherwise
 */
function shouldProcessEvent(
  event: Event,
  tag: string,
  host: HTMLElement,
  ignoreNestedComponents: boolean
): boolean {
  if (!(event instanceof Event && event.target instanceof HTMLElement)) return false;

  const eventTarget = event.target;

  const origin = eventTarget.closest(tag);
  if (!origin) return false;

  if (ignoreNestedComponents) {
    // Find the closest parent with the same tag as the host
    const closestParentWithSameTag = findClosestParentWithTag(eventTarget, host.localName);
    if (closestParentWithSameTag !== host) return false;
  }

  return true;
}

/**
 * Decorator that guards event handlers to only execute when the event meets certain criteria.
 * @param tag - The local name of the element that should be the target of the event
 * @param option - Configuration options for the event guard
 * @param option.ignoreNestedComponents - Whether to ignore events from nested components
 */
export function EventFrom(
  tag: string,
  option: { ignoreNestedComponents: boolean } = { ignoreNestedComponents: true }
) {
  return function (
    target: object,
    propertyKey: string,
    descriptor?: PropertyDescriptor
  ) {
    if (descriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (event: Event) {
        if (!shouldProcessEvent(event, tag, this.host, option.ignoreNestedComponents)) {
          return;
        }

        return originalMethod.call(this, event);
      };
    } else {
      // Creates a hidden storage property for the original method using a
      // modified key format (__[property]_original) to avoid naming conflicts
      const privateKey = `__${propertyKey}_original`;

      // Create hidden storage for original method
      Object.defineProperty(target, privateKey, {
        writable: true,
        configurable: true
      });

      // Replace property with getter/setter
      Object.defineProperty(target, propertyKey, {
        // Getter returns original method
        get() {
          return this[privateKey];
        },

        // Setter wraps original method with extra code
        set(originalFunction: (event: Event) => void) {
          if (typeof originalFunction === 'function') {
            // Store original and add new behavior
            this[privateKey] = (event: Event) => {
              if (!shouldProcessEvent(event, tag, this.host, option.ignoreNestedComponents)) {
                return;
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
 * that matches the specified tag name.
 * @param element - The starting element
 * @param tagName - The tag name to match (e.g., 'post-accordion')
 * @returns The closest matching ancestor or null if none found
 */
function findClosestParentWithTag(element: Element, tagName: string): Element | null {
  let current: Element | null = element;

  while (current) {
    if (current.localName === tagName) {
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
