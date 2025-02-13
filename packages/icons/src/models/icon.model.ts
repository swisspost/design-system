import type {
  Type,
  TypeFilter,
  VariantMIME,
  Businessfield,
  MediaSize,
} from './censhare-result-page.model';

export interface IconSet {
  name: string;
  apiUrl: string;
  downloadDirectory: string;
  expectedSourcesPerIcon: number;
}

export interface IconSetGroupsItem {
  size: number | null;
  filePath: string;
  sourceIcon: SourceIcon;
}

export interface IconSetGroups {
  name: string;
  options: {
    sourceDirectory: string;
    expectedSourcesPerIcon: number;
  };
  groups: Record<string, IconSetGroupsItem[]>;
}

export interface SourceIcon {
  uuid: string;
  id: number;
  type: Type;
  typeFilter: TypeFilter;
  meta: {
    downloadLink: string;
    businessfield: Businessfield;
    keywords: string[];
    year?: string;
  };
  file: {
    mime: VariantMIME;
    name: string;
    basename: string;
    ext: string;
    size?: MediaSize;
  };
  createdAt: Date;
  modifiedAt: Date;
  errored?: boolean;
  errorMessage?: string;
}

export interface MergedIcon {
  uuid: string;
  id: number;
  meta: {
    businessfield: Businessfield;
    keywords: string[];
  };
  file: {
    mime: VariantMIME;
    name: string;
    basename: string;
    ext: string;
  };
  stats: {
    sources: SourceIcon[];
    errored: number[];
    noSVG: number[];
    wrongViewBox: number[];
    duplicates: number[];
    hasAllSources: boolean;
    hasKeywords: boolean;
    success: boolean;
  };
  createdAt: Date;
  modifiedAt: Date;
}

export interface MinimalSourceIcon {
  id: number;
  name: string;
}

export interface MinimalIcon {
  id: number;
  name: string;
  keys: string[];
  stats: {
    sources: MinimalSourceIcon[];
    errored: number[];
    noSVG: number[];
    wrongViewBox: number[];
    duplicates: number[];
    hasAllSources: boolean;
    hasKeywords: boolean;
    success: boolean;
  };
}

export interface SourceReport {
  icons: SourceIcon[];
  errored: SourceIcon[];
  noSVG: SourceIcon[];
  wrongViewBox: SourceIcon[];
  noKeywords: SourceIcon[];
  duplicates: SourceIcon[];
  stats: {
    success: number;
    errors: number;
    noSVG: number;
    wrongViewBox: number;
    noKeywords: number;
    duplicates: number;
  };
  created: Date;
  version: string;
}

export interface MergedReport {
  icons: MergedIcon[];
  stats: {
    sources: number;
    errored: number;
    noSVG: number;
    wrongViewBox: number;
    hasAllSources: number;
    noKeywords: number;
    duplicates: number;
    success: number;
  };
  created: Date;
  version: string;
}

export interface MinimalReport {
  icons: MinimalIcon[];
  stats: {
    sources: number;
    errored: number;
    noSVG: number;
    wrongViewBox: number;
    hasAllSources: number;
    noKeywords: number;
    duplicates: number;
    success: number;
  };
  created: Date;
  version: string;
}
