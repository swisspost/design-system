/**
 * Common test utilities for icon tests
 * Provides helpers to reduce boilerplate and duplication
 */

import fs from 'fs';

/**
 * Extract the report.json write call from fs.writeFileSync mock
 */
export function getReportJsonCall(mockWriteFileSync: jest.Mock) {
  const call = mockWriteFileSync.mock.calls.find(call =>
    call[0].includes('report.json') && !call[0].includes('report.min.json')
  );
  return call;
}

/**
 * Extract and parse the report.json data from fs.writeFileSync mock
 */
export function getReportJsonData(mockWriteFileSync: jest.Mock) {
  const call = getReportJsonCall(mockWriteFileSync);
  return call ? JSON.parse(call[1]) : null;
}

/**
 * Extract the report.min.json write call from fs.writeFileSync mock
 */
export function getMinReportJsonCall(mockWriteFileSync: jest.Mock) {
  const call = mockWriteFileSync.mock.calls.find(call =>
    call[0].includes('report.min.json')
  );
  return call;
}

/**
 * Extract and parse the report.min.json data from fs.writeFileSync mock
 */
export function getMinReportJsonData(mockWriteFileSync: jest.Mock) {
  const call = getMinReportJsonCall(mockWriteFileSync);
  return call ? JSON.parse(call[1]) : null;
}

/**
 * Setup common fs mocks with default implementations
 * Returns spy objects for easy assertion
 */
export function setupFsMocks() {
  return {
    existsSync: jest.spyOn(fs, 'existsSync').mockReturnValue(false),
    mkdirSync: jest.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined),
    rmSync: jest.spyOn(fs, 'rmSync').mockImplementation(() => {}),
    unlinkSync: jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {}),
    writeFileSync: jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {}),
    readFileSync: jest.spyOn(fs, 'readFileSync').mockReturnValue(''),
    readdirSync: jest.spyOn(fs, 'readdirSync').mockReturnValue([] as unknown as fs.Dirent[]),
  };
}

/**
 * Shared test assertions for report.json structure
 */
export function expectReportJsonStructure(reportData: any) {
  expect(reportData).toHaveProperty('icons');
  expect(reportData).toHaveProperty('stats');
  expect(reportData).toHaveProperty('created');
  expect(reportData).toHaveProperty('version');
}

/**
 * Shared test assertions for icon structure
 */
export function expectIconStructure(icon: any) {
  expect(icon).toHaveProperty('uuid');
  expect(icon).toHaveProperty('id');
  expect(icon).toHaveProperty('meta');
  expect(icon).toHaveProperty('file');
  expect(icon).toHaveProperty('createdAt');
  expect(icon).toHaveProperty('modifiedAt');
}

/**
 * Shared test assertions for meta structure
 */
export function expectMetaStructure(meta: any) {
  expect(meta).toHaveProperty('businessfield');
  expect(meta).toHaveProperty('keywords');
  expect(Array.isArray(meta.keywords)).toBe(true);
}

/**
 * Shared test assertions for file structure
 */
export function expectFileStructure(file: any) {
  expect(file).toHaveProperty('mime');
  expect(file).toHaveProperty('name');
  expect(file).toHaveProperty('basename');
  expect(file).toHaveProperty('ext');
}

/**
 * Shared test assertions for stats structure in download reports
 */
export function expectDownloadStatsStructure(stats: any) {
  expect(stats).toHaveProperty('success');
  expect(stats).toHaveProperty('errors');
  expect(stats).toHaveProperty('noSVG');
  expect(stats).toHaveProperty('wrongViewBox');
  expect(stats).toHaveProperty('noKeywords');
  expect(stats).toHaveProperty('duplicates');
}

/**
 * Shared test assertions for stats structure in build reports
 */
export function expectBuildStatsStructure(stats: any) {
  expect(stats).toHaveProperty('set');
  expect(stats).toHaveProperty('sources');
  expect(stats).toHaveProperty('errored');
  expect(stats).toHaveProperty('noSVG');
  expect(stats).toHaveProperty('wrongViewBox');
  expect(stats).toHaveProperty('hasAllSources');
  expect(stats).toHaveProperty('noKeywords');
  expect(stats).toHaveProperty('duplicates');
  expect(stats).toHaveProperty('success');
}

/**
 * Shared test assertions for icon stats in build reports
 */
export function expectIconStatsStructure(stats: any) {
  expect(stats).toHaveProperty('set');
  expect(stats).toHaveProperty('sources');
  expect(stats).toHaveProperty('errored');
  expect(stats).toHaveProperty('noSVG');
  expect(stats).toHaveProperty('wrongViewBox');
  expect(stats).toHaveProperty('duplicates');
  expect(stats).toHaveProperty('hasAllSources');
  expect(stats).toHaveProperty('hasKeywords');
  expect(stats).toHaveProperty('success');
}

/**
 * Helper to verify icons are sorted by basename
 */
export function expectIconsSortedByBasename(icons: any[]) {
  for (let i = 1; i < icons.length; i++) {
    expect(icons[i - 1].file.basename <= icons[i].file.basename).toBe(true);
  }
}

/**
 * Verify that a directory was removed with recursive option
 */
export function expectDirectoryRemoved(fsMock: jest.SpyInstance, dirPath: string) {
  expect(fsMock).toHaveBeenCalledWith(dirPath, { recursive: true });
}

/**
 * Verify that a directory was created with recursive option
 */
export function expectDirectoryCreated(fsMock: jest.SpyInstance, dirPath: string) {
  expect(fsMock).toHaveBeenCalledWith(dirPath, { recursive: true });
}

/**
 * Verify that a file was removed
 */
export function expectFileRemoved(fsMock: jest.SpyInstance, filePath: string) {
  expect(fsMock).toHaveBeenCalledWith(filePath);
}

/**
 * Shared test pattern: verify cleanup happens before creation
 */
export function expectCleanupBeforeCreation(
  calls: string[],
  identifier: string,
  cleanupPrefix: string = 'rm',
  createPrefix: string = 'mkdir'
) {
  const cleanupIndex = calls.indexOf(`${cleanupPrefix}:${identifier}`);
  const createIndex = calls.indexOf(`${createPrefix}:${identifier}`);

  expect(cleanupIndex).toBeGreaterThanOrEqual(0);
  expect(createIndex).toBeGreaterThan(cleanupIndex);
}
