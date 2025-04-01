import { shadowClosest } from '../shadow-closest';

export function EventGuard(options: { targetLocalName: string; delegatorSelector?: string }) {
  return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (event: CustomEvent) {
      const targetElement = event.target as HTMLElement | null;

      if (!targetElement || targetElement.localName !== options.targetLocalName) {
        return;
      }

      if (options.delegatorSelector) {
        const closest = shadowClosest(targetElement, options.delegatorSelector);
        if (closest !== this.host as HTMLElement) {
          return;
        }
      }

      return originalMethod.call(this, event);
    };

    return descriptor;
  };
}
