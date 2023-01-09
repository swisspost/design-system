import { ContentInfo, PostInfo, Type, TypeFilter } from './censhare-result-page.model';

export interface IIcon {
  downloadLink: string;
  type: Type;
  contentInfo: ContentInfo;
  typeFilter: TypeFilter;
  name: string;
  id: number;
  postInfo: PostInfo;
  modifiedAt: Date;
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
  noSVG: IIcon[];
  errored: IIcon[];
  version: string;
}
