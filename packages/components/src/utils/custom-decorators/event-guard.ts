import { shadowClosest } from '../shadow-closest';

export function EventGuard(options: {
  targetLocalName: string;
  delegatorSelector?: string;
}) {
  return function (
    _target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (event: CustomEvent) {
      const target = event.target as HTMLElement | null;

      console.group(`[EventGuard] Event: ${event.type}`);
      console.log('→ Target:', target);
      console.log('→ Expected localName:', options.targetLocalName);

      if (!target) {
        console.warn('✘ No target found on event.');
        console.groupEnd();
        return;
      }

      if (target.localName !== options.targetLocalName) {
        console.warn(
          `✘ Target localName mismatch: expected "${options.targetLocalName}", got "${target.localName}"`
        );
        console.groupEnd();
        return;
      }

      console.log('✓ localName matched.');

      if (options.delegatorSelector) {
        const closest = shadowClosest(target, options.delegatorSelector);
        console.log('→ shadowClosest result:', closest);
        console.log('→ Host:', this.host);

        if (closest !== this.host) {
          console.warn(
            `✘ shadowClosest did not match host: expected "${this.host}", got "${closest}"`
          );
          console.groupEnd();
          return;
        }

        console.log('✓ shadowClosest matched host.');
      }

      console.log('✓ All checks passed. Executing original method.');
      console.groupEnd();

      return originalMethod.call(this, event);
    };

    return descriptor;
  };
}
