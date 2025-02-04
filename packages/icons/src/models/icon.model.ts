import {
  Type,
  TypeFilter,
  VariantMIME,
  Businessfield,
  MediaSize,
} from './censhare-result-page.model';

export interface Icon {
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
  raws: string[];
}

export interface IconSet {
  name: string;
  apiUrl: string;
  downloadDirectory: string;
}

export interface GroupItem {
  size: number | null;
  filePath: string;
  report: Icon;
}

export interface IconSetGroups {
  name: string;
  sourceDirectory: string;
  groups: Record<string, GroupItem[]>;
}

export interface JsonReport {
  raw: Icon[];
  icons: OutputIcon[];
  wrongViewBox: Icon[];
  noKeywords: Icon[];
  noSVG: Icon[];
  errored: Icon[];
  stats: {
    errors: number;
    notFound: number;
    success: number;
    output: number;
  };
  created: Date;
  version: string;
}
