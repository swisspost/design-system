import { writeReport } from './../report';
import fs from 'fs';
import path from 'path';
import type { IconSetGroups } from '../../../models/icon.model';
import { Businessfield } from '../../../models/censhare-result-page.model';
import {
  createMockSourceIcon,
  createMockSourceIconWithSize,
  createMockSourceReport,
  createMockIconSetGroupsReportTest,
} from '../../../../tests/helpers/test-mocks';
import {
  getReportJsonData,
  getMinReportJsonData,
  expectReportJsonStructure,
  expectIconStructure,
  expectMetaStructure,
  expectFileStructure,
  expectBuildStatsStructure,
  expectIconStatsStructure,
  expectIconsSortedByBasename,
} from '../../../../tests/helpers/test-utils';

jest.mock('fs');
jest.mock('../../../../package.json', () => ({ version: '1.0.0' }));

describe('build/report', () => {
  const mockReportOutputDirectory = '/test/reports';

  const mockSourceReport = createMockSourceReport([
    createMockSourceIcon(
      {
        meta: {
          downloadLink: 'http://test.com/1000.svg',
          businessfield: Businessfield.Kommunikation,
          keywords: ['test', 'icon', 'sample'],
          year: '2024',
        },
      },
      1000,
    ),
    createMockSourceIconWithSize(1001, 24, {
      meta: {
        downloadLink: 'http://test.com/1001.svg',
        businessfield: Businessfield.Kommunikation,
        keywords: ['ui', 'button'],
        year: '2024',
      },
    }),
  ]);

  const mockIconSetGroups = createMockIconSetGroupsReportTest();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockSourceReport));
    jest.spyOn(fs, 'writeFileSync').mockImplementation();
  });

  describe('report.json structure', () => {
    it('should create report.json with required top-level properties', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expectReportJsonStructure(reportData);
    });

    it('should include correct version in report.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expect(reportData.version).toBe('1.0.0');
    });

    it('should include created timestamp in report.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expect(reportData.created).toBeDefined();
      expect(new Date(reportData.created)).toBeInstanceOf(Date);
    });

    it('should include stats object with all required fields', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expectBuildStatsStructure(reportData.stats);
    });

    it('should include set statistics for each iconset', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expect(reportData.stats.set).toHaveProperty('post');
      expect(reportData.stats.set).toHaveProperty('ui');
      expect(reportData.stats.set.post).toHaveProperty('sources');
      expect(reportData.stats.set.post).toHaveProperty('outputs');
    });

    it('should include icon array with proper structure', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expect(Array.isArray(reportData.icons)).toBe(true);
      expect(reportData.icons.length).toBeGreaterThan(0);

      const icon = reportData.icons[0];
      expectIconStructure(icon);
      expect(icon).toHaveProperty('stats');
    });

    it('should include meta information for each icon', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);
      const icon = reportData.icons[0];

      expectMetaStructure(icon.meta);
    });

    it('should include file information for each icon', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);
      const icon = reportData.icons[0];

      expectFileStructure(icon.file);
      expect(icon.file.mime).toBe('image/svg+xml');
    });

    it('should include stats for each icon', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);
      const icon = reportData.icons[0];

      expectIconStatsStructure(icon.stats);
    });
  });

  describe('report.min.json structure', () => {
    it('should create report.min.json with simplified structure', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const minReportData = getMinReportJsonData(fs.writeFileSync as jest.Mock);
      
      expect(minReportData).toBeDefined();
      expectReportJsonStructure(minReportData);
    });

    it('should include simplified icon structure in report.min.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const minReportData = getMinReportJsonData(fs.writeFileSync as jest.Mock);
      const icon = minReportData.icons[0];

      expect(icon).toHaveProperty('id');
      expect(icon).toHaveProperty('name');
      expect(icon).toHaveProperty('keys');
      expect(icon).toHaveProperty('stats');
      expect(Array.isArray(icon.keys)).toBe(true);
    });

    it('should include simplified source references in report.min.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const minReportData = getMinReportJsonData(fs.writeFileSync as jest.Mock);
      const icon = minReportData.icons[0];

      expect(Array.isArray(icon.stats.sources)).toBe(true);
      expect(icon.stats.sources).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: expect.any(Number), name: expect.any(String) }),
        ])
      );
    });
  });

  describe('report generation logic', () => {
    it('should merge keywords from multiple source icons', () => {
      const multiSourceGroups: IconSetGroups[] = [
        {
          name: 'post',
          options: {
            sourceDirectory: '/test/post',
            expectedSourcesPerIcon: 2,
          },
          groups: {
            '1000': [
              {
                size: 16,
                filePath: '/test/post/1000-16.svg',
                sourceIcon: {
                  ...mockSourceReport.icons[0],
                  meta: {
                    ...mockSourceReport.icons[0].meta,
                    keywords: ['keyword1', 'keyword2'],
                  },
                },
              },
              {
                size: 24,
                filePath: '/test/post/1000-24.svg',
                sourceIcon: {
                  ...mockSourceReport.icons[0],
                  meta: {
                    ...mockSourceReport.icons[0].meta,
                    keywords: ['keyword2', 'keyword3'],
                  },
                },
              },
            ],
          },
        },
      ];

      writeReport(mockReportOutputDirectory, multiSourceGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);
      const icon = reportData.icons[0];

      expect(icon.meta.keywords).toContain('keyword1');
      expect(icon.meta.keywords).toContain('keyword2');
      expect(icon.meta.keywords).toContain('keyword3');
    });

    it('should sort icons by basename', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expectIconsSortedByBasename(reportData.icons);
    });

    it('should calculate correct source counts per iconset', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expect(reportData.stats.set.post.sources).toBe(1);
      expect(reportData.stats.set.ui.sources).toBe(1);
    });

    it('should calculate correct output counts per iconset', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);

      expect(reportData.stats.set.post.outputs).toBe(1);
      expect(reportData.stats.set.ui.outputs).toBe(1);
    });

    it('should track icons with missing sources', () => {
      const incompleteGroups: IconSetGroups[] = [
        {
          name: 'ui',
          options: {
            sourceDirectory: '/test/ui',
            expectedSourcesPerIcon: 6, // Expects 6 but only has 1
          },
          groups: {
            '1001': [
              {
                size: 24,
                filePath: '/test/ui/1001-24.svg',
                sourceIcon: mockSourceReport.icons[1],
              },
            ],
          },
        },
      ];

      writeReport(mockReportOutputDirectory, incompleteGroups);

      const reportData = getReportJsonData(fs.writeFileSync as jest.Mock);
      const icon = reportData.icons[0];

      expect(icon.stats.hasAllSources).toBe(false);
    });

    it('should write both full and minimal reports', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.join(mockReportOutputDirectory, 'report.json'),
        expect.any(String)
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.join(mockReportOutputDirectory, 'report.min.json'),
        expect.any(String)
      );
    });
  });
});