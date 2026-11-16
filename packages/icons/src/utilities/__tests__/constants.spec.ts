import path from 'path';

describe('constants output paths', () => {
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
  });

  function loadConstants(args: string[]) {
    process.argv = ['node', 'script', ...args];
    let constants!: typeof import('../constants');
    jest.isolateModules(() => {
      constants = jest.requireActual<typeof import('../constants')>('../constants');
    });
    return constants;
  }

  it('uses the package paths by default', () => {
    const constants = loadConstants([]);

    expect(constants.SOURCE_PATH).toBe('src/icons');
    expect(constants.OUTPUT_PATH).toBe('public');
    expect(constants.OUTPUT_PATH_ICONS).toBe('public/post-icons');
    expect(constants.OUTPUT_PATH_CSS).toBe('dist/custom-properties');
  });

  it('derives all paths from the --out argument', () => {
    const out = path.resolve('custom-out');
    const constants = loadConstants(['--out', 'custom-out']);

    expect(constants.SOURCE_PATH).toBe(path.join(out, 'source'));
    expect(constants.OUTPUT_PATH).toBe(out);
    expect(constants.OUTPUT_PATH_ICONS).toBe(`${out}/post-icons`);
    expect(constants.OUTPUT_PATH_CSS).toBe(path.join(out, 'custom-properties'));
  });
});
