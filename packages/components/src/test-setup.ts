jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');
  const fallbackHosts = new WeakMap<object, HTMLElement>();

  return {
    ...actual,
    // Only use `host` when it is a plain value: a component's `@Element() host` is a getter that
    // calls `getElement` itself, which would recurse forever.
    getElement: (ref: object) => {
      const own = Object.getOwnPropertyDescriptor(ref, 'host');
      if (own && 'value' in own && own.value) return own.value as HTMLElement;

      if (!fallbackHosts.has(ref)) fallbackHosts.set(ref, document.createElement('post-test'));
      return fallbackHosts.get(ref);
    },
  };
});

// `newSpecPage` builds fresh component metadata for every page, but Stencil proxies a component
// class only once (`isProxied`). From the second page on, prop accessors that decorators such as
// `@Required()` put on the prototype are no longer wired to Stencil's prop storage, so the props
// read back as `undefined`. Restoring the prototype before every page mimics a fresh module load.
jest.mock('@stencil/core/testing', () => {
  const actual = jest.requireActual('@stencil/core/testing');
  const pristinePrototypes = new WeakMap<object, PropertyDescriptorMap>();

  return {
    ...actual,
    newSpecPage: (options: { components?: Array<{ prototype: object; isProxied?: boolean }> }) => {
      for (const component of options.components ?? []) {
        const prototype = component.prototype;
        const pristine = pristinePrototypes.get(prototype);

        if (!pristine) {
          pristinePrototypes.set(prototype, Object.getOwnPropertyDescriptors(prototype));
          continue;
        }

        for (const key of Reflect.ownKeys(prototype)) {
          if (!(key in pristine)) delete prototype[key as keyof typeof prototype];
        }
        Object.defineProperties(prototype, pristine);
        delete component.isProxied;
      }

      return actual.newSpecPage(options);
    },
  };
});
