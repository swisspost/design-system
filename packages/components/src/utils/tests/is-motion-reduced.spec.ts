describe('isMotionReduced', () => {
  let matchMedia;

  beforeEach(() => {
    jest.resetModules();
    matchMedia = window.matchMedia = jest.fn();
  });

  it('should return true if reduced motion is requested', async () => {
    matchMedia.mockReturnValue({ matches: true });
    const { Build } = await import('@stencil/core');
    Build.isBrowser = true; // Mocking the Browser, as Stencil's Build.isBrowser = false and Build.isServer = true in Jest.
    const { isMotionReduced } = await import('../is-motion-reduced');
    expect(isMotionReduced()).toBe(true);
  });

  it('should return false if reduced motion is not requested', async () => {
    matchMedia.mockReturnValue({ matches: false });
    const { Build } = await import('@stencil/core');
    Build.isBrowser = true;
    const { isMotionReduced } = await import('../is-motion-reduced');
    expect(isMotionReduced()).toBe(false);
  });
});
