import {
  Type,
  TypeFilter,
  VariantMIME,
  Businessfield,
  MediaSize,
} from './censhare-result-page.model';

export interface IIconSet {
  name: string;
  apiUrl: string;
  downloadDirectory: string;
}

export interface IIcon {
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

export interface IJSONReport {
  created: Date;
  stats: {
    errors: number;
    success: number;
    notFound: number;
  };
  icons: IIcon[];
  wrongViewBox: IIcon[];
  noKeywords: IIcon[];
  noSVG: IIcon[];
  errored: IIcon[];
  version: string;
}

export interface IFile {
  size: number | null;
  filePath: string;
}
