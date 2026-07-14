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
  ignoreNestedComponents: boolean,
  allowDescendants: boolean = false,
): boolean {
  if (!(event instanceof Event && event.target instanceof HTMLElement)) return false;

  const eventTarget = event.target;

  if (allowDescendants) {
    // Accept event if target or any ancestor matches tag
    if (!eventTarget.closest(tag)) return false;
  } else {
    // Only accept event if target exactly matches tag
    if (eventTarget.localName !== tag) return false;
  }

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
  option?: { ignoreNestedComponents?: boolean; allowDescendants?: boolean },
) {
  // Set default values here
  const opts = {
    ignoreNestedComponents: true,
    allowDescendants: false,
    ...option,
  };
  return function (target: object, propertyKey: string, descriptor?: PropertyDescriptor) {
    if (descriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (event: Event) {
        if (
          !shouldProcessEvent(
            event,
            tag,
            this.host,
            opts.ignoreNestedComponents,
            opts.allowDescendants,
          )
        ) {
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
        configurable: true,
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
              if (!shouldProcessEvent(event, tag, this.host, opts.ignoreNestedComponents)) {
                return;
              }

              return originalFunction.call(this, event);
            };
          } else {
            this[privateKey] = originalFunction;
          }
        },
        configurable: true,
        enumerable: true,
      });
    }
  };
}

/**
 * Traverses up the DOM (including crossing shadow DOM boundaries) to find the closest ancestor
 * matching the given predicate.
 * @param start - The starting element
 * @param predicate - A type guard used to test each ancestor
 * @returns The closest matching ancestor or null if none found
 */
export function findClosestAcrossShadow<T extends Element>(
  start: Element,
  predicate: (el: Element) => el is T,
): T | null {
  let current: Element | null = start;

  while (current) {
    if (predicate(current)) {
      return current;
    }

    // Check regular parent first
    if (current.parentElement) {
      current = current.parentElement;
    } else {
      // Use duck-typing to detect ShadowRoot: nodeType 11 (DocumentFragment) with a host Element.
      // This avoids a direct `instanceof ShadowRoot` reference, which may be unavailable in
      // test environments (e.g. JSDOM) that only partially implement the Shadow DOM API.
      const parent = current.parentNode;
      if (parent !== null && parent.nodeType === 11 && 'host' in parent) {
        current = (parent as ShadowRoot).host as Element;
      } else {
        current = null;
      }
    }
  }

  return null;
}

function findClosestParentWithTag(element: Element, tagName: string): Element | null {
  return findClosestAcrossShadow(element, (el): el is Element => el.localName === tagName);
}
