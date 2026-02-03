import { writeReport } from './../report';
import fs from 'fs';
import path from 'path';
import type { IconSetGroups } from '../../../models/icon.model';
import {
  createMockSourceIcon,
  createMockSourceIconWithSize,
  createMockSourceReport,
  createMockIconSetGroupsReportTest,
} from '../../../../tests/helpers/test-mocks';

jest.mock('fs');
jest.mock('../../../../package.json', () => ({ version: '1.0.0' }));

describe('build/report', () => {
  const mockReportOutputDirectory = '/test/reports';

  const mockSourceReport = createMockSourceReport([
    createMockSourceIcon(
      {
        meta: {
          downloadLink: 'http://test.com/1000.svg',
          businessfield: require('../../../models/censhare-result-page.model')
            .Businessfield.Kommunikation,
          keywords: ['test', 'icon', 'sample'],
          year: '2024',
        },
      },
      1000,
    ),
    createMockSourceIconWithSize(1001, 24, {
      meta: {
        downloadLink: 'http://test.com/1001.svg',
        businessfield: require('../../../models/censhare-result-page.model')
          .Businessfield.Kommunikation,
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

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      expect(reportData).toHaveProperty('icons');
      expect(reportData).toHaveProperty('stats');
      expect(reportData).toHaveProperty('created');
      expect(reportData).toHaveProperty('version');
    });

    it('should include correct version in report.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      expect(reportData.version).toBe('1.0.0');
    });

    it('should include created timestamp in report.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      expect(reportData.created).toBeDefined();
      expect(new Date(reportData.created)).toBeInstanceOf(Date);
    });

    it('should include stats object with all required fields', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      expect(reportData.stats).toHaveProperty('set');
      expect(reportData.stats).toHaveProperty('sources');
      expect(reportData.stats).toHaveProperty('errored');
      expect(reportData.stats).toHaveProperty('noSVG');
      expect(reportData.stats).toHaveProperty('wrongViewBox');
      expect(reportData.stats).toHaveProperty('hasAllSources');
      expect(reportData.stats).toHaveProperty('noKeywords');
      expect(reportData.stats).toHaveProperty('duplicates');
      expect(reportData.stats).toHaveProperty('success');
    });

    it('should include set statistics for each iconset', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      expect(reportData.stats.set).toHaveProperty('post');
      expect(reportData.stats.set).toHaveProperty('ui');
      expect(reportData.stats.set.post).toHaveProperty('sources');
      expect(reportData.stats.set.post).toHaveProperty('outputs');
    });

    it('should include icon array with proper structure', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      expect(Array.isArray(reportData.icons)).toBe(true);
      expect(reportData.icons.length).toBeGreaterThan(0);

      const icon = reportData.icons[0];
      expect(icon).toHaveProperty('uuid');
      expect(icon).toHaveProperty('id');
      expect(icon).toHaveProperty('meta');
      expect(icon).toHaveProperty('file');
      expect(icon).toHaveProperty('stats');
      expect(icon).toHaveProperty('createdAt');
      expect(icon).toHaveProperty('modifiedAt');
    });

    it('should include meta information for each icon', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);
      const icon = reportData.icons[0];

      expect(icon.meta).toHaveProperty('businessfield');
      expect(icon.meta).toHaveProperty('keywords');
      expect(Array.isArray(icon.meta.keywords)).toBe(true);
    });

    it('should include file information for each icon', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);
      const icon = reportData.icons[0];

      expect(icon.file).toHaveProperty('mime');
      expect(icon.file).toHaveProperty('name');
      expect(icon.file).toHaveProperty('basename');
      expect(icon.file).toHaveProperty('ext');
      expect(icon.file.mime).toBe('image/svg+xml');
    });

    it('should include stats for each icon', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);
      const icon = reportData.icons[0];

      expect(icon.stats).toHaveProperty('set');
      expect(icon.stats).toHaveProperty('sources');
      expect(icon.stats).toHaveProperty('errored');
      expect(icon.stats).toHaveProperty('noSVG');
      expect(icon.stats).toHaveProperty('wrongViewBox');
      expect(icon.stats).toHaveProperty('duplicates');
      expect(icon.stats).toHaveProperty('hasAllSources');
      expect(icon.stats).toHaveProperty('hasKeywords');
      expect(icon.stats).toHaveProperty('success');
    });
  });

  describe('report.min.json structure', () => {
    it('should create report.min.json with simplified structure', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const minReportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.min.json')
      );
      
      expect(minReportCall).toBeDefined();
      const minReportData = JSON.parse(minReportCall[1]);

      expect(minReportData).toHaveProperty('icons');
      expect(minReportData).toHaveProperty('stats');
      expect(minReportData).toHaveProperty('created');
      expect(minReportData).toHaveProperty('version');
    });

    it('should include simplified icon structure in report.min.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const minReportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.min.json')
      );
      const minReportData = JSON.parse(minReportCall[1]);
      const icon = minReportData.icons[0];

      expect(icon).toHaveProperty('id');
      expect(icon).toHaveProperty('name');
      expect(icon).toHaveProperty('keys');
      expect(icon).toHaveProperty('stats');
      expect(Array.isArray(icon.keys)).toBe(true);
    });

    it('should include simplified source references in report.min.json', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const minReportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.min.json')
      );
      const minReportData = JSON.parse(minReportCall[1]);
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

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);
      const icon = reportData.icons[0];

      expect(icon.meta.keywords).toContain('keyword1');
      expect(icon.meta.keywords).toContain('keyword2');
      expect(icon.meta.keywords).toContain('keyword3');
    });

    it('should sort icons by basename', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      for (let i = 1; i < reportData.icons.length; i++) {
        expect(reportData.icons[i - 1].file.basename <= reportData.icons[i].file.basename).toBe(true);
      }
    });

    it('should calculate correct source counts per iconset', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

      expect(reportData.stats.set.post.sources).toBe(1);
      expect(reportData.stats.set.ui.sources).toBe(1);
    });

    it('should calculate correct output counts per iconset', () => {
      writeReport(mockReportOutputDirectory, mockIconSetGroups);

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);

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

      const reportCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(reportCall[1]);
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