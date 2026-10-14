// Mock Stencil's build conditionals to simulate a browser environment

jest.mock('@stencil/core', () => {
  const module = jest.requireActual('@stencil/core');
  return {
    ...module,
    Build: {
      ...module.Build,
      isBrowser: true,
      isServer: false,
    },
  };
});
