import fs from 'fs';
import path from 'path';
import { fetchSVGs } from '../fetch';

jest.mock('fs');
jest.mock('../fetch', () => ({ fetchSVGs: jest.fn() }));

describe('design-system-icons CLI', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.argv = originalArgv;
    jest.restoreAllMocks();
  });

  function runCli(args: string[]) {
    process.argv = ['node', 'cli', ...args];
    jest.isolateModules(() => {
      jest.requireActual<typeof import('../cli')>('../cli');
    });
  }

  it.each([[], ['unknown', '--out', 'icons']])('rejects an invalid command: %j', (...args) => {
    expect(() => runCli(args)).toThrow('Expected the fetch command');
    expect(fetchSVGs).not.toHaveBeenCalled();
  });

  it.each([['fetch'], ['fetch', '--out'], ['fetch', '--out', ''], ['fetch', '--out', '   ']])(
    'rejects a missing or empty output directory: %j',
    (...args) => {
      expect(() => runCli(args)).toThrow();
      expect(fetchSVGs).not.toHaveBeenCalled();
    },
  );

  it('warns for non-empty output and preserves existing files', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['existing.svg'] as never);
    const warn = jest.spyOn(console, 'warn').mockImplementation();

    runCli(['fetch', '--out', 'icons']);

    expect(fs.readdirSync).toHaveBeenCalledWith(path.resolve('icons'));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('not empty'));
    expect(fetchSVGs).toHaveBeenCalledWith(true);
  });

  it.each([false, true])('does not warn for an empty or new directory', exists => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(exists);
    jest.spyOn(fs, 'readdirSync').mockReturnValue([] as never);
    const warn = jest.spyOn(console, 'warn').mockImplementation();

    runCli(['fetch', '--out', 'icons']);

    expect(warn).not.toHaveBeenCalled();
    expect(fetchSVGs).toHaveBeenCalledWith(true);
  });
});
