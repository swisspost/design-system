import { createSvgs } from './../createSvgs';
import fs from 'fs';
import path from 'path';
import {
  createMockIconSetGroupsReportTest,
} from '../../../../tests/helpers/test-mocks';

jest.mock('fs');

describe('createSvgs', () => {
  const mockIconOutputDirectory = '/test/output/icons';
  
  const mockIconSetGroups = createMockIconSetGroupsReportTest();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock file reading for SVG content
    jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
      if (typeof filePath === 'string') {
        if (filePath.includes('1000.svg')) {
          return '<svg viewBox="0 0 32 32"><path d="M10 10h12v12H10z"/></svg>';
        }
        if (filePath.includes('2000-24.svg')) {
          return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
        }
      }
      return '';
    });

    jest.spyOn(fs, 'writeFileSync').mockImplementation();
  });

  it('should create SVG files for post icons', () => {
    createSvgs(mockIconOutputDirectory, mockIconSetGroups);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(mockIconOutputDirectory, '1000.svg'),
      expect.stringContaining('<svg')
    );
  });

  it('should create SVG files for ui icons with multiple sizes', () => {
    createSvgs(mockIconOutputDirectory, mockIconSetGroups);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(mockIconOutputDirectory, '2000.svg'),
      expect.stringContaining('<svg')
    );
  });

  it('should generate proper symbol IDs for icons', () => {
    createSvgs(mockIconOutputDirectory, mockIconSetGroups);

    const postIconCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
      call[0].includes('1000.svg')
    );
    expect(postIconCall[1]).toContain('id="i-1000"');
  });

  it('should handle multiple icon set groups', () => {
    createSvgs(mockIconOutputDirectory, mockIconSetGroups);

    expect(fs.writeFileSync).toHaveBeenCalledTimes(2); // one post icon + one ui icon
  });

  it('should preserve SVG content structure', () => {
    createSvgs(mockIconOutputDirectory, mockIconSetGroups);

    const postIconCall = (fs.writeFileSync as jest.Mock).mock.calls.find(call =>
      call[0].includes('1000.svg')
    );
    
    expect(postIconCall[1]).toContain('<svg');
    expect(postIconCall[1]).toContain('</svg>');
    expect(postIconCall[1]).toContain('<defs>');
  });

  it('should handle icons with missing SVG files gracefully', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => {
      createSvgs(mockIconOutputDirectory, mockIconSetGroups);
    }).toThrow();
  });

  it('should create output directory path correctly', () => {
    createSvgs(mockIconOutputDirectory, mockIconSetGroups);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(path.normalize(mockIconOutputDirectory)),
      expect.any(String)
    );
  });
});