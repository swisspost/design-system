import { updateReport, writeReport } from './../report';
import fs from 'fs';
import path from 'path';
import type { SourceIcon, SourceReport } from '../../../models/icon.model';
import { getBaseSourceReport } from '../../shared';
import {
  createMockIconSet,
  createMockSourceIcon,
  createMockSourceIconWithSize,
} from '../../../../tests/helpers/test-mocks';

jest.mock('fs');

describe('download/report', () => {
  const mockIconSet = createMockIconSet();
  const mockIcon = createMockSourceIcon({}, 1000);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fs, 'writeFileSync').mockImplementation();
  });

  describe('updateReport', () => {
    it('should add icon to report when SVG is successfully downloaded', () => {
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 32 32"><path d="M10 10"/></svg>';

      const updatedReport = updateReport(mockIconSet, svg, mockIcon, report);

      expect(updatedReport.icons).toContainEqual(mockIcon);
      expect(updatedReport.icons.length).toBe(1);
    });

    it('should add icon to noSVG array when SVG download fails', () => {
      const report = getBaseSourceReport();
      const svg = false;

      const updatedReport = updateReport(mockIconSet, svg, mockIcon, report);

      expect(updatedReport.noSVG).toContainEqual(mockIcon);
      expect(updatedReport.icons.length).toBe(0);
    });

    it('should track duplicate icons', () => {
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 32 32"><path d="M10 10"/></svg>';

      let updatedReport = updateReport(mockIconSet, svg, mockIcon, report);
      updatedReport = updateReport(mockIconSet, svg, mockIcon, updatedReport);

      expect(updatedReport.duplicates).toContainEqual(mockIcon);
      expect(updatedReport.icons.length).toBe(1); // Should still have only one icon
    });

    it('should detect wrong viewBox in post icons', () => {
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 64 64"><path d="M10 10"/></svg>'; // Wrong viewBox

      const updatedReport = updateReport(mockIconSet, svg, mockIcon, report);

      expect(updatedReport.wrongViewBox).toContainEqual(mockIcon);
    });

    it('should detect correct viewBox in post icons', () => {
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 32 32"><path d="M10 10"/></svg>';

      const updatedReport = updateReport(mockIconSet, svg, mockIcon, report);

      expect(updatedReport.wrongViewBox).not.toContainEqual(mockIcon);
    });

    it('should detect wrong viewBox in ui icons based on size in name', () => {
      const uiIconSet = createMockIconSet({ name: 'ui' });
      const uiIcon = createMockSourceIconWithSize(1000, 24);
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 32 32"><path d="M10 10"/></svg>'; // Should be 24

      const updatedReport = updateReport(uiIconSet, svg, uiIcon, report);

      expect(updatedReport.wrongViewBox).toContainEqual(uiIcon);
    });

    it('should detect correct viewBox in ui icons', () => {
      const uiIconSet = createMockIconSet({ name: 'ui' });
      const uiIcon = createMockSourceIconWithSize(1000, 24);
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 24 24"><path d="M10 10"/></svg>';

      const updatedReport = updateReport(uiIconSet, svg, uiIcon, report);

      expect(updatedReport.wrongViewBox).not.toContainEqual(uiIcon);
    });

    it('should track icons with no keywords', () => {
      const iconWithoutKeywords: SourceIcon = {
        ...mockIcon,
        meta: { ...mockIcon.meta, keywords: [] },
      };
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 32 32"><path d="M10 10"/></svg>';

      const updatedReport = updateReport(mockIconSet, svg, iconWithoutKeywords, report);

      expect(updatedReport.noKeywords).toContainEqual(iconWithoutKeywords);
    });

    it('should track errored icons', () => {
      const erroredIcon: SourceIcon = { ...mockIcon, errored: true };
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 32 32"><path d="M10 10"/></svg>';

      const updatedReport = updateReport(mockIconSet, svg, erroredIcon, report);

      expect(updatedReport.errored).toContainEqual(erroredIcon);
    });

    it('should handle multiple issues on the same icon', () => {
      const problematicIcon: SourceIcon = {
        ...mockIcon,
        meta: { ...mockIcon.meta, keywords: [] },
        errored: true,
      };
      const report = getBaseSourceReport();
      const svg = '<svg viewBox="0 0 64 64"><path d="M10 10"/></svg>';

      const updatedReport = updateReport(mockIconSet, svg, problematicIcon, report);

      expect(updatedReport.errored).toContainEqual(problematicIcon);
      expect(updatedReport.noKeywords).toContainEqual(problematicIcon);
      expect(updatedReport.wrongViewBox).toContainEqual(problematicIcon);
    });
  });

  describe('writeReport', () => {
    describe('report.json structure', () => {
      it('should create report.json with required top-level properties', () => {
        const report: SourceReport = {
          ...getBaseSourceReport(),
          icons: [mockIcon],
        };

        writeReport(mockIconSet, report);

        const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
          call[0].includes('report.json')
        );
        const reportData = JSON.parse(writeCall[1]);

        expect(reportData).toHaveProperty('icons');
        expect(reportData).toHaveProperty('errored');
        expect(reportData).toHaveProperty('noSVG');
        expect(reportData).toHaveProperty('wrongViewBox');
        expect(reportData).toHaveProperty('noKeywords');
        expect(reportData).toHaveProperty('duplicates');
        expect(reportData).toHaveProperty('stats');
        expect(reportData).toHaveProperty('created');
        expect(reportData).toHaveProperty('version');
      });

      it('should include stats with all required fields', () => {
        const report: SourceReport = {
          ...getBaseSourceReport(),
          icons: [mockIcon],
        };

        writeReport(mockIconSet, report);

        const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
          call[0].includes('report.json')
        );
        const reportData = JSON.parse(writeCall[1]);

        expect(reportData.stats).toHaveProperty('success');
        expect(reportData.stats).toHaveProperty('errors');
        expect(reportData.stats).toHaveProperty('noSVG');
        expect(reportData.stats).toHaveProperty('wrongViewBox');
        expect(reportData.stats).toHaveProperty('noKeywords');
        expect(reportData.stats).toHaveProperty('duplicates');
      });

      it('should include icon with complete structure', () => {
        const report: SourceReport = {
          ...getBaseSourceReport(),
          icons: [mockIcon],
        };

        writeReport(mockIconSet, report);

        const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
          call[0].includes('report.json')
        );
        const reportData = JSON.parse(writeCall[1]);
        const icon = reportData.icons[0];

        expect(icon).toHaveProperty('uuid');
        expect(icon).toHaveProperty('id');
        expect(icon).toHaveProperty('type');
        expect(icon).toHaveProperty('typeFilter');
        expect(icon).toHaveProperty('meta');
        expect(icon).toHaveProperty('file');
        expect(icon).toHaveProperty('createdAt');
        expect(icon).toHaveProperty('modifiedAt');
      });

      it('should include meta with complete structure', () => {
        const report: SourceReport = {
          ...getBaseSourceReport(),
          icons: [mockIcon],
        };

        writeReport(mockIconSet, report);

        const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
          call[0].includes('report.json')
        );
        const reportData = JSON.parse(writeCall[1]);
        const icon = reportData.icons[0];

        expect(icon.meta).toHaveProperty('downloadLink');
        expect(icon.meta).toHaveProperty('businessfield');
        expect(icon.meta).toHaveProperty('keywords');
        expect(Array.isArray(icon.meta.keywords)).toBe(true);
      });

      it('should include file with complete structure', () => {
        const report: SourceReport = {
          ...getBaseSourceReport(),
          icons: [mockIcon],
        };

        writeReport(mockIconSet, report);

        const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
          call[0].includes('report.json')
        );
        const reportData = JSON.parse(writeCall[1]);
        const icon = reportData.icons[0];

        expect(icon.file).toHaveProperty('mime');
        expect(icon.file).toHaveProperty('name');
        expect(icon.file).toHaveProperty('basename');
        expect(icon.file).toHaveProperty('ext');
        expect(icon.file).toHaveProperty('size');
        expect(icon.file.size).toHaveProperty('width');
        expect(icon.file.size).toHaveProperty('height');
        expect(icon.file.size).toHaveProperty('dpi');
      });
    });

    it('should sort icons by basename', () => {
      const report: SourceReport = {
        ...getBaseSourceReport(),
        icons: [
          { ...mockIcon, file: { ...mockIcon.file, basename: 'zebra' } },
          { ...mockIcon, file: { ...mockIcon.file, basename: 'apple' } },
          { ...mockIcon, file: { ...mockIcon.file, basename: 'middle' } },
        ],
      };

      writeReport(mockIconSet, report);

      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(writeCall[1]);

      expect(reportData.icons[0].file.basename).toBe('apple');
      expect(reportData.icons[1].file.basename).toBe('middle');
      expect(reportData.icons[2].file.basename).toBe('zebra');
    });

    it('should calculate correct stats', () => {
      const report: SourceReport = {
        ...getBaseSourceReport(),
        icons: [mockIcon, mockIcon],
        errored: [mockIcon],
        noSVG: [mockIcon],
        wrongViewBox: [mockIcon],
        noKeywords: [mockIcon],
        duplicates: [mockIcon],
      };

      writeReport(mockIconSet, report);

      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
        call[0].includes('report.json')
      );
      const reportData = JSON.parse(writeCall[1]);

      expect(reportData.stats.success).toBe(2);
      expect(reportData.stats.errors).toBe(1);
      expect(reportData.stats.noSVG).toBe(1);
      expect(reportData.stats.wrongViewBox).toBe(1);
      expect(reportData.stats.noKeywords).toBe(1);
      expect(reportData.stats.duplicates).toBe(1);
    });

    it('should write report to correct file path', () => {
      const report = getBaseSourceReport();

      writeReport(mockIconSet, report);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        path.join(mockIconSet.downloadDirectory, 'report.json'),
        expect.any(String)
      );
    });

    it('should return the updated report', () => {
      const report: SourceReport = {
        ...getBaseSourceReport(),
        icons: [mockIcon],
      };

      const result = writeReport(mockIconSet, report);

      expect(result).toEqual(expect.objectContaining({
        icons: expect.any(Array),
        stats: expect.objectContaining({
          success: expect.any(Number),
          errors: expect.any(Number),
        }),
      }));
    });
  });
});