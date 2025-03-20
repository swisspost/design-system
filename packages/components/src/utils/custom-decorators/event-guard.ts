import { shadowClosest } from '../shadow-closest';

export function EventGuard(options: { targetLocalName: string; delegatorSelector?: string }) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; // Save the original method
    // Override the method
    descriptor.value = function (event: CustomEvent) {
      console.log('[EventGuard] Event received:', event); // Debug log
      console.log('[EventGuard] Delegator selector received:', options.delegatorSelector);


      const host = this.host as HTMLElement;
      const targetElement = event.target as HTMLElement | null;

      if (!targetElement) {
        console.warn('[EventGuard] No target found on event:', event);
        return;
      }

      if (targetElement.localName !== options.targetLocalName) {
        console.warn(
          `[EventGuard] Target localName "${targetElement.localName}" does not match expected "${options.targetLocalName}"`
        );
        return;
      }

      if (options.delegatorSelector) {
        const closest = shadowClosest(targetElement, options.delegatorSelector);
        if (closest !== host) {
          console.warn(
            `[EventGuard] Delegator selector mismatch. Expected host:`,
            host,
            `, but found closest:`,
            closest
          );
          return;
        }
      }

      console.log('[EventGuard] Guard passed for event:', event);
      return originalMethod.call(this, event);
    };

    return descriptor;
  };
}