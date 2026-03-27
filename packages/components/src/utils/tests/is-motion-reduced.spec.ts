describe('isMotionReduced', () => {
  let matchMedia;
  let isMotionReduced;

  beforeEach(async () => {
    jest.resetModules();
    matchMedia = window.matchMedia = jest.fn();
    const { Build } = await import('@stencil/core');
    Build.isBrowser = true; // Mocking the Browser, as Stencil's Build.isBrowser = false and Build.isServer = true in Jest.
    ({ isMotionReduced } = await import('../is-motion-reduced'));
  });

  it('should return true if reduced motion is requested', async () => {
    matchMedia.mockReturnValue({ matches: true });
    expect(isMotionReduced()).toBe(true);
  });

  it('should return false if reduced motion is not requested', async () => {
    matchMedia.mockReturnValue({ matches: false });

    expect(isMotionReduced()).toBe(false);
  });
});
