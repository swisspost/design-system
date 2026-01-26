import { setup } from './../setup';
import fs from 'fs';
import iconSets from '../../../iconsets.config';

jest.mock('fs');
jest.mock('../../../iconsets.config', () => [
  {
    name: 'post',
    apiUrl: 'http://test.com/post',
    downloadDirectory: '/test/download/post',
    expectedSourcesPerIcon: 1,
  },
  {
    name: 'ui',
    apiUrl: 'http://test.com/ui',
    downloadDirectory: '/test/download/ui',
    expectedSourcesPerIcon: 6,
  },
]);

describe('download/setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should remove existing download directories for all iconsets', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'rmSync').mockImplementation(() => {});
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);

    setup();

    iconSets.forEach(iconSet => {
      expect(fs.existsSync).toHaveBeenCalledWith(iconSet.downloadDirectory);
      expect(fs.rmSync).toHaveBeenCalledWith(iconSet.downloadDirectory, { recursive: true });
    });
  });

  it('should create download directories for all iconsets', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);

    setup();

    iconSets.forEach(iconSet => {
      expect(fs.mkdirSync).toHaveBeenCalledWith(iconSet.downloadDirectory, { recursive: true });
    });
  });

  it('should handle case when directories do not exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'rmSync').mockImplementation(() => {});
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);

    setup();

    expect(fs.rmSync).not.toHaveBeenCalled();
    iconSets.forEach(iconSet => {
      expect(fs.mkdirSync).toHaveBeenCalledWith(iconSet.downloadDirectory, { recursive: true });
    });
  });

  it('should handle multiple iconsets', () => {
    let callCount = 0;
    jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      callCount++;
      return callCount % 2 === 1;
    });
    jest.spyOn(fs, 'rmSync').mockImplementation(() => {});
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined);

    setup();

    expect(fs.rmSync).toHaveBeenCalledTimes(iconSets.length);
    expect(fs.mkdirSync).toHaveBeenCalledTimes(iconSets.length);
  });

  it('should clean up before creating new directories', () => {
    const calls: string[] = [];
    let existsCallCount = 0;

    jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      existsCallCount++;
      return existsCallCount % 2 === 1; // odd -> exists (rm), even -> not exists (mkdir)
    });
    jest.spyOn(fs, 'rmSync').mockImplementation((p) => {
      calls.push(`rm:${p.toString()}`);
    });
    jest.spyOn(fs, 'mkdirSync').mockImplementation((p) => {
      calls.push(`mkdir:${p.toString()}`);
      return undefined;
    });

    setup();

    iconSets.forEach(iconSet => {
      const rmIndex = calls.indexOf(`rm:${iconSet.downloadDirectory}`);
      const mkdirIndex = calls.indexOf(`mkdir:${iconSet.downloadDirectory}`);

      expect(rmIndex).toBeGreaterThanOrEqual(0);
      expect(mkdirIndex).toBeGreaterThan(rmIndex);
    });
  });
});