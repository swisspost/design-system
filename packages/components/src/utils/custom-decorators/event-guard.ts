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

      console.groupCollapsed(
        `%c[EventGuard]%c Event: %c${event.type}`,
        'background: #ff9800; color: white; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'color: gray;',
        'color: #03a9f4; font-weight: bold;'
      );

      console.log('%c→ Target:', 'color: #666;', target);
      console.log(
        `%c→ Expected localName: %c${options.targetLocalName}`,
        'color: #666;',
        'color: #4caf50; font-weight: bold;'
      );

      if (!target) {
        console.warn(
          '%c✘ No target found on event.',
          'color: red; font-weight: bold;'
        );
        console.groupEnd();
        return;
      }

      if (target.localName !== options.targetLocalName) {
        console.warn(
          `%c✘ Target localName mismatch: expected "${options.targetLocalName}", got "${target.localName}"`,
          'color: red; font-weight: bold;'
        );
        console.groupEnd();
        return;
      }

      console.log('%c✓ localName matched.', 'color: #4caf50; font-weight: bold;');

      if (options.delegatorSelector) {
        const closest = shadowClosest(target, options.delegatorSelector);
        console.log('%c→ closestHost result:', 'color: #666;', closest);
        console.log('%c→ Host:', 'color: #666;', this.host);

        if (closest !== this.host) {
          console.warn(
            `%c✘ closestHost mismatch`,
            'color: white; background-color: red; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
          );
          console.groupEnd();
          return;
        }                

        console.log('%c✓ closestHost matched host.', 'color: #4caf50; font-weight: bold;');
      }

      console.log('%c✓ All checks passed. Executing original method.', 'color: #2196f3; font-weight: bold;');
      console.groupEnd();

      return originalMethod.call(this, event);
    };

    return descriptor;
  };
}
