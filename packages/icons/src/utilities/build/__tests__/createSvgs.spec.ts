import { createSvgs } from './../createSvgs';
import fs from 'fs';
import path from 'path';
import type { IconSetGroups } from '../../../models/icon.model';

jest.mock('fs');

describe('createSvgs', () => {
  const mockIconOutputDirectory = '/test/output/icons';
  
  const mockIconSetGroups: IconSetGroups[] = [
    {
      name: 'post',
      options: {
        sourceDirectory: '/test/source/post',
        expectedSourcesPerIcon: 1,
      },
      groups: {
        '1000': [
          {
            size: null,
            filePath: '/test/source/post/1000.svg',
            sourceIcon: {
              uuid: 'test-uuid',
              id: 1000,
              type: 'picture.pictogram.' as any,
              typeFilter: 'pictograms' as any,
              meta: {
                downloadLink: 'http://test.com/1000.svg',
                businessfield: 'kommunikation' as any,
                keywords: ['test', 'icon'],
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
          },
        ],
      },
    },
    {
      name: 'ui',
      options: {
        sourceDirectory: '/test/source/ui',
        expectedSourcesPerIcon: 6,
      },
      groups: {
        '2000': [
          {
            size: 16,
            filePath: '/test/source/ui/2000-16.svg',
            sourceIcon: {
              uuid: 'test-uuid-ui-16',
              id: 2000,
              type: 'picture.pictogram.' as any,
              typeFilter: 'pictograms' as any,
              meta: {
                downloadLink: 'http://test.com/2000-16.svg',
                businessfield: 'kommunikation' as any,
                keywords: ['ui', 'icon'],
              },
              file: {
                mime: 'image/svg+xml' as any,
                name: '2000-16.svg',
                basename: '2000-16',
                ext: '.svg',
                size: { width: 16, dpi: 72, height: 16 },
              },
              createdAt: new Date('2024-01-01'),
              modifiedAt: new Date('2024-01-02'),
            },
          },
          {
            size: 24,
            filePath: '/test/source/ui/2000-24.svg',
            sourceIcon: {
              uuid: 'test-uuid-ui-24',
              id: 2001,
              type: 'picture.pictogram.' as any,
              typeFilter: 'pictograms' as any,
              meta: {
                downloadLink: 'http://test.com/2000-24.svg',
                businessfield: 'kommunikation' as any,
                keywords: ['ui', 'icon'],
              },
              file: {
                mime: 'image/svg+xml' as any,
                name: '2000-24.svg',
                basename: '2000-24',
                ext: '.svg',
                size: { width: 24, dpi: 72, height: 24 },
              },
              createdAt: new Date('2024-01-01'),
              modifiedAt: new Date('2024-01-02'),
            },
          },
        ],
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock file reading for SVG content
    jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
      if (typeof filePath === 'string') {
        if (filePath.includes('1000.svg')) {
          return '<svg viewBox="0 0 32 32"><path d="M10 10h12v12H10z"/></svg>';
        }
        if (filePath.includes('2000-16.svg')) {
          return '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/></svg>';
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