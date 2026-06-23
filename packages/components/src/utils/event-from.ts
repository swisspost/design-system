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
    if (!eventTarget.closest(tag)) return false;
  } else {
    if (eventTarget.localName !== tag) return false;
  }

  if (ignoreNestedComponents) {
    const closestParentWithSameTag = findClosestParentWithTag(eventTarget, host.localName);
    if (closestParentWithSameTag !== host) return false;
  }

  return true;
}

export function EventFrom(
  tag: string,
  option?: { ignoreNestedComponents?: boolean; allowDescendants?: boolean },
) {
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
      const privateKey = `__${propertyKey}_original`;

      Object.defineProperty(target, privateKey, {
        writable: true,
        configurable: true,
      });

      Object.defineProperty(target, propertyKey, {
        get() {
          return this[privateKey];
        },

        set(originalFunction: (event: Event) => void) {
          if (typeof originalFunction === 'function') {
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

export function findClosestAcrossShadow<T extends Element>(
  start: Element,
  predicate: (el: Element) => el is T,
): T | null {
  let current: Element | null = start;

  while (current) {
    if (predicate(current)) {
      return current;
    }

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
