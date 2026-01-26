import { getIconSetGroups } from './../iconSetGroups';
import fs from 'fs';
import path from 'path';
import type { SourceReport } from '../../../models/icon.model';

jest.mock('fs');
jest.mock('../../../iconsets.config', () => [
  {
    name: 'test-iconset',
    apiUrl: 'http://test.com',
    downloadDirectory: '/test/icons',
    expectedSourcesPerIcon: 2,
  },
]);

describe('getIconSetGroups', () => {
  const mockSourceReport: SourceReport = {
    icons: [
      {
        uuid: 'test-uuid-1',
        id: 1000,
        type: 'picture.pictogram.' as any,
        typeFilter: 'pictograms' as any,
        meta: {
          downloadLink: 'http://test.com/1000.svg',
          businessfield: 'kommunikation' as any,
          keywords: ['test', 'icon'],
          year: '2024',
        },
        file: {
          mime: 'image/svg+xml' as any,
          name: '1000.svg',
          basename: '1000',
          ext: '.svg',
          size: { width: 32, dpi: 72, height: 32 },
        },
        createdAt: new Date('2024-01-01'),
        modifiedAt: new Date('2024-01-02'),
      },
      {
        uuid: 'test-uuid-2',
        id: 1001,
        type: 'picture.pictogram.' as any,
        typeFilter: 'pictograms' as any,
        meta: {
          downloadLink: 'http://test.com/1001-24.svg',
          businessfield: 'kommunikation' as any,
          keywords: ['test', 'icon'],
          year: '2024',
        },
        file: {
          mime: 'image/svg+xml' as any,
          name: '1001-24.svg',
          basename: '1001-24',
          ext: '.svg',
          size: { width: 24, dpi: 72, height: 24 },
        },
        createdAt: new Date('2024-01-01'),
        modifiedAt: new Date('2024-01-02'),
      },
      {
        uuid: 'test-uuid-3',
        id: 1002,
        type: 'picture.pictogram.' as any,
        typeFilter: 'pictograms' as any,
        meta: {
          downloadLink: 'http://test.com/1001-32.svg',
          businessfield: 'kommunikation' as any,
          keywords: ['test', 'icon'],
          year: '2024',
        },
        file: {
          mime: 'image/svg+xml' as any,
          name: '1001-32.svg',
          basename: '1001-32',
          ext: '.svg',
          size: { width: 32, dpi: 72, height: 32 },
        },
        createdAt: new Date('2024-01-01'),
        modifiedAt: new Date('2024-01-02'),
      },
    ],
    errored: [],
    noSVG: [],
    wrongViewBox: [],
    noKeywords: [],
    duplicates: [],
    stats: {
      success: 3,
      errors: 0,
      noSVG: 0,
      wrongViewBox: 0,
      noKeywords: 0,
      duplicates: 0,
    },
    created: new Date('2024-01-01'),
    version: '1.0.0',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify(mockSourceReport));
  });

  it('should read the source report from the iconset download directory', () => {
    getIconSetGroups();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join('/test/icons', 'report.json'),
      'utf-8'
    );
  });

  it('should group icons by their base name without size indicator', () => {
    const result = getIconSetGroups();

    expect(result).toHaveLength(1);
    expect(result[0].groups).toHaveProperty('1000');
    expect(result[0].groups).toHaveProperty('1001');
  });

  it('should include size information for icons with size indicators', () => {
    const result = getIconSetGroups();

    const group1001 = result[0].groups['1001'];
    expect(group1001).toHaveLength(2);
    expect(group1001[0].size).toBe(24);
    expect(group1001[1].size).toBe(32);
  });

  it('should set size to null for icons without size indicators', () => {
    const result = getIconSetGroups();

    const group1000 = result[0].groups['1000'];
    expect(group1000).toHaveLength(1);
    expect(group1000[0].size).toBeNull();
  });

  it('should include the correct file path for each icon', () => {
    const result = getIconSetGroups();

    const group1000 = result[0].groups['1000'];
    expect(group1000[0].filePath).toBe('/test/icons/1000.svg');
  });

  it('should include the source icon reference', () => {
    const result = getIconSetGroups();

    const group1000 = result[0].groups['1000'];
    expect(group1000[0].sourceIcon).toMatchObject({
      id: 1000,
      file: {
        name: '1000.svg',
        basename: '1000',
      },
    });
  });

  it('should filter out unwanted parts from icon names', () => {
    const mockReportWithShapeIcon: SourceReport = {
      ...mockSourceReport,
      icons: [
        {
          ...mockSourceReport.icons[0],
          id: 2000,
          file: {
            mime: 'image/svg+xml' as any,
            name: 'test-shape-icon.svg',
            basename: 'test-shape-icon',
            ext: '.svg',
            size: { width: 32, dpi: 72, height: 32 },
          },
        },
      ],
    };

    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify(mockReportWithShapeIcon));

    const result = getIconSetGroups();

    // 'shape' should be filtered out according to ID_UNWANTED_PARTS
    expect(result[0].groups).toHaveProperty('test-icon');
  });

  it('should return the correct iconset metadata', () => {
    const result = getIconSetGroups();

    expect(result[0].name).toBe('test-iconset');
    expect(result[0].options.sourceDirectory).toBe('/test/icons');
    expect(result[0].options.expectedSourcesPerIcon).toBe(2);
  });
});