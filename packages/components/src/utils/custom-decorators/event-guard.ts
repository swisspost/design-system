import { shadowClosest } from '../shadow-closest';

export function EventGuard(options: { targetLocalName: string; delegatorSelector?: string }) {
  return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (event: CustomEvent) {
      const target = event.target as HTMLElement | null;
      const host = this.host as HTMLElement;

      if (!target || target.localName !== options.targetLocalName) return;

      if (options.delegatorSelector && shadowClosest(target, options.delegatorSelector) !== host) return;

      return originalMethod.call(this, event);
    };

    return descriptor;
  };
}

