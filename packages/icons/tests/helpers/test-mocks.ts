/**
 * Common test mock generators for icon tests
 */

import type {
  IconSet,
  SourceIcon,
  SourceReport,
  IconSetGroups,
  MergedIcon,
} from '../../src/models/icon.model';
import {
  Type,
  TypeFilter,
  Businessfield,
  VariantMIME,
} from '../../src/models/censhare-result-page.model';

/**
 * Create a mock IconSet with optional overrides
 */
export function createMockIconSet(overrides?: Partial<IconSet>): IconSet {
  return {
    name: 'test',
    apiUrl: 'http://test.com',
    downloadDirectory: '/test/download',
    expectedSourcesPerIcon: 1,
    ...overrides,
  };
}

/**
 * Create a mock SourceIcon with optional overrides
 */
export function createMockSourceIcon(
  overrides?: Partial<SourceIcon>,
  id: number = 1000,
): SourceIcon {
  return {
    uuid: `test-uuid-${id}`,
    id,
    type: Type.PicturePictogram,
    typeFilter: TypeFilter.Pictograms,
    meta: {
      downloadLink: `http://test.com/${id}.svg`,
      businessfield: Businessfield.Kommunikation,
      keywords: ['test', 'icon'],
      year: '2024',
    },
    file: {
      mime: VariantMIME.ImageSVGXML,
      name: `${id}.svg`,
      basename: `${id}`,
      ext: '.svg',
      size: { width: 32, dpi: 72, height: 32 },
    },
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-01-02'),
    ...overrides,
  };
}

/**
 * Create a mock SourceIcon with size variant
 */
export function createMockSourceIconWithSize(
  id: number = 1000,
  size: number = 24,
  overrides?: Partial<SourceIcon>,
): SourceIcon {
  const baseName = `${id}-${size}`;
  return createMockSourceIcon(
    {
      file: {
        mime: VariantMIME.ImageSVGXML,
        name: `${baseName}.svg`,
        basename: baseName,
        ext: '.svg',
        size: { width: size, dpi: 72, height: size },
      },
      meta: {
        downloadLink: `http://test.com/${baseName}.svg`,
        businessfield: Businessfield.Kommunikation,
        keywords: ['test', 'icon'],
        year: '2024',
      },
      ...overrides,
    },
    id,
  );
}

/**
 * Create a mock SourceReport with optional icon list
 */
export function createMockSourceReport(
  icons?: SourceIcon[],
  overrides?: Partial<SourceReport>,
): SourceReport {
  return {
    icons: icons || [],
    errored: [],
    noSVG: [],
    wrongViewBox: [],
    noKeywords: [],
    duplicates: [],
    stats: {
      success: icons?.length || 0,
      errors: 0,
      noSVG: 0,
      wrongViewBox: 0,
      noKeywords: 0,
      duplicates: 0,
    },
    created: new Date('2024-01-01'),
    version: '1.0.0',
    ...overrides,
  };
}

/**
 * Create mock IconSetGroups (for build tests)
 */
export function createMockIconSetGroups(
  overrides?: Partial<IconSetGroups>,
): IconSetGroups {
  const defaultIcon = createMockSourceIcon({}, 1000);

  return {
    name: 'test-iconset',
    options: {
      sourceDirectory: '/test/source/test',
      expectedSourcesPerIcon: 1,
    },
    groups: {
      '1000': [
        {
          size: null,
          filePath: '/test/source/test/1000.svg',
          sourceIcon: defaultIcon,
        },
      ],
    },
    ...overrides,
  };
}

/**
 * Create multiple mock IconSetGroups (post and ui variations)
 */
export function createMockIconSetGroupsMultiple(): IconSetGroups[] {
  const postIcon = createMockSourceIcon({}, 1000);
  const uiIcon16 = createMockSourceIconWithSize(2000, 16);
  const uiIcon24 = createMockSourceIconWithSize(2000, 24);
  const uiIcon32 = createMockSourceIconWithSize(2000, 32);

  return [
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
            sourceIcon: postIcon,
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
            sourceIcon: uiIcon16,
          },
          {
            size: 24,
            filePath: '/test/source/ui/2000-24.svg',
            sourceIcon: uiIcon24,
          },
          {
            size: 32,
            filePath: '/test/source/ui/2000-32.svg',
            sourceIcon: uiIcon32,
          },
        ],
      },
    },
  ];
}

/**
 * Create simplified mock IconSetGroups for build/report tests (1 post icon, 1 ui icon)
 */
export function createMockIconSetGroupsReportTest(): IconSetGroups[] {
  const postIcon = createMockSourceIcon({}, 1000);
  const uiIcon = createMockSourceIconWithSize(2000, 24);

  return [
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
            sourceIcon: postIcon,
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
            size: 24,
            filePath: '/test/source/ui/2000-24.svg',
            sourceIcon: uiIcon,
          },
        ],
      },
    },
  ];
}

/**
 * Create multiple mock SourceIcons with various scenarios
 */
export function createMockSourceIconList(): SourceIcon[] {
  return [
    createMockSourceIcon({}, 1000),
    createMockSourceIconWithSize(1001, 24),
    createMockSourceIconWithSize(1001, 32),
    createMockSourceIcon(
      {
        meta: {
          downloadLink: 'http://test.com/1002.svg',
          businessfield: Businessfield.Kommunikation,
          keywords: [],
          year: '2024',
        },
      },
      1002,
    ),
    createMockSourceIcon(
      {
        errored: true,
      },
      1003,
    ),
  ];
}

/**
 * Create multiple mock SourceReports for different icon sets
 */
export function createMockSourceReportMultiple(): {
  post: SourceReport;
  ui: SourceReport;
  } {
  const postIcon = createMockSourceIcon({}, 1000);
  const uiIcon = createMockSourceIconWithSize(2000, 24);

  return {
    post: createMockSourceReport([postIcon]),
    ui: createMockSourceReport([uiIcon]),
  };
}

/**
 * Create a mock merged icon
 */
export function createMockMergedIcon(
  overrides?: Partial<MergedIcon>,
  id: number = 1000,
): MergedIcon {
  return {
    uuid: `test-uuid-${id}`,
    id,
    meta: {
      businessfield: Businessfield.Kommunikation,
      keywords: ['test', 'icon'],
    },
    file: {
      mime: VariantMIME.ImageSVGXML,
      name: `${id}.svg`,
      basename: `${id}`,
      ext: '.svg',
    },
    stats: {
      set: 'test',
      sources: [],
      errored: [],
      noSVG: [],
      wrongViewBox: [],
      duplicates: [],
      hasAllSources: true,
      hasKeywords: true,
      success: true,
    },
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-01-02'),
    ...overrides,
  };
}
