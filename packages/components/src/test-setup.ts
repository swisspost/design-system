jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');

  return {
    ...actual,
    getElement: (ref: { host?: HTMLElement }) => ref.host ?? document.createElement('post-test'),
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
