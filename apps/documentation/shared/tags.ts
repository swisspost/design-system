/** Prefix of the tags that link a page to the package it documents, e.g. `package:Styles` */
export const PACKAGE_TAG_PREFIX = 'package:';

/** Tag of the pages that are only listed in dev mode */
export const DEV_ONLY_TAG = 'devOnly';

/** Tag of the components that were added recently */
export const NEW_TAG = 'status:New';

export enum PackageType {
  Styles = 'Styles',
  Wc = 'WebComponents',
  React = 'React',
  Angular = 'Angular',
  InternetHeader = 'InternetHeader',
  Assets = 'Assets',
  Ts = 'Typescript',
}
