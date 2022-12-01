import {
  ContentInfo,
  PostInfo,
  Type,
  TypeFilter,
} from "./censhare-result-page";

export interface IIcon {
  downloadLink: string;
  type: Type;
  contentInfo: ContentInfo;
  typeFilter: TypeFilter;
  name: string;
  id: number;
  postInfo: PostInfo;
  modifiedAt: Date;
}
