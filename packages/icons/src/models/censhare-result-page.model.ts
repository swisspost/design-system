export interface CenshareResultPage {
  'result': CenshareResult[];
  'offset': number;
  'limit': number;
  'count': number;
  'total-count': number;
  'page': Page;
}

export interface CenshareError {
  details: {
    authenticated?: boolean;
  };
  error: string;
}

export interface Page {
  next: string;
  current: string;
  last: string;
  first: string;
}

export interface CenshareResult {
  modifiedAt: Date | string;
  mime: ResultMIME;
  domain2: Domain2;
  workflowStep: string;
  variants: Variant[];
  media: { [key: string]: MediaValue };
  type: Type;
  uuid: string;
  contentInfo: ContentInfo;
  colorSpace: ColorSpace;
  createdAt: string;
  outputChannel: OutputChannel[];
  postInfo: PostInfo;
  typeFilter: TypeFilter;
  size: MediaSize;
  downloadLink: string;
  hashCode: string;
  domain: Domain;
  name: string;
  id: number;
  detectedColor: DetectedColor;
  workflowId: string;
}

export enum ColorSpace {
  Cmyk = 'cmyk',
}

export interface ContentInfo {
  freeKeywords: string;
}

export interface DetectedColor {
  schema: ColorSpace;
}

export enum Domain {
  RootDivisionsPostch = 'root.divisions.postch.',
}

export enum Domain2 {
  RootDamMediapool = 'root.dam.mediapool.',
}

export interface MediaValue {
  size: MediaSize;
  downloadLink: string;
  mime: MediaMIME;
}

export enum MediaMIME {
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
}

export interface MediaSize {
  width: number;
  dpi: number;
  height: number;
}

export enum ResultMIME {
  ApplicationPostscript = 'application/postscript',
}

export enum OutputChannel {
  RootBrandingnetPost = 'root.brandingnet.post.',
  RootBrandingnetPostLive = 'root.brandingnet.post.live.',
}

export interface PostInfo {
  businessfield: Businessfield;
  year?: string;
}

export enum Businessfield {
  Kommunikation = 'kommunikation',
  Edk = 'edk',
}

export enum Type {
  PicturePictogram = 'picture.pictogram.',
}

export enum TypeFilter {
  Pictograms = 'pictograms',
}

export interface Variant {
  modifiedAt: Date | string;
  mime: VariantMIME;
  variantOf: string[];
  domain2: Domain2;
  workflowStep: string;
  media: VariantMedia;
  type: Type;
  uuid: string;
  contentInfo: ContentInfo;
  colorSpace: VariantColorSpace;
  createdAt: string;
  postInfo: PostInfo;
  typeFilter: TypeFilter;
  size: MediaSize;
  downloadLink: string;
  hashCode: string;
  domain: Domain;
  name: string;
  id: number;
  detectedColor: DetectedColor;
  workflowId: string;
}

export enum VariantColorSpace {
  RGB = 'rgb',
}

export interface VariantMedia {
  preview: MediaValue;
  thumbnail: MediaValue;
}

export enum VariantMIME {
  ImageSVGXML = 'image/svg+xml',
}
