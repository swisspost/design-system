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

export interface OutputIcon {
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
  createdAt: Date;
  modifiedAt: Date;
  sources: number[];
}

export interface MinimalIcon {
  id: number;
  name: string;
  keys: string[];
  sources: number[];
}

export interface IconSetGroupsItem {
  size: number | null;
  filePath: string;
  report: SourceIcon;
}

export interface IconSetGroups {
  name: string;
  sourceDirectory: string;
  groups: Record<string, IconSetGroupsItem[]>;
}

export interface JsonReport {
  sources: SourceIcon[];
  icons: OutputIcon[];
  wrongViewBox: SourceIcon[];
  noKeywords: SourceIcon[];
  noSVG: SourceIcon[];
  errored: SourceIcon[];
  stats: {
    errors: number;
    notFound: number;
    success: number;
    output: number;
  };
  created: Date;
  version: string;
}

export interface MinimalJsonReport {
  sources: MinimalIcon[];
  icons: MinimalIcon[];
  created: Date;
  version: string;
}
