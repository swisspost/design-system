jest.mock('@stencil/core', () => {
  const actual = jest.requireActual('@stencil/core');

  return {
    ...actual,
    getElement: (ref: { host?: HTMLElement }) => ref.host ?? document.createElement('post-test'),
  };
});
