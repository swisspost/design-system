describe('environment detection', () => {
  afterEach(async () => {
    const { afterTestCleanup } = await import('./hydrate-app-helper');
    afterTestCleanup();
  });

  it('should detect browser', async () => {
    const { IS_BROWSER, IS_SERVER } = await import('../../environment');

    expect(IS_BROWSER).toBe(true);
    expect(IS_SERVER).toBe(false);
  });

  it('should detect server', async () => {
    const { getAppEnv } = await import('./hydrate-app-helper');
    const { IS_BROWSER, IS_SERVER } = await getAppEnv();

    expect(IS_BROWSER).toBe(false);
    expect(IS_SERVER).toBe(true);
  });
});
