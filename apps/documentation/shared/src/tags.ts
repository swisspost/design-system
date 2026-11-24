export const STATUS_TAG_PREFIX = 'status:';
export const PACKAGE_TAG_PREFIX = 'package:';
export const VISIBILITY_TAG_PREFIX = 'visibility:';
export const KEYWORD_TAG_PREFIX = 'keyword:';

export type Status = 'new';

export type Visibility = 'dev';

export type Tag = KeywordTag | PackageTag | StatusTag | VisibilityTag;

/** Links a page to a package. **/
export type PackageTag = `${typeof PACKAGE_TAG_PREFIX}${string}`;

/** Sets the visibility of a page. **/
export type VisibilityTag = `${typeof VISIBILITY_TAG_PREFIX}${Visibility}`;

/** Adds a status to a page. **/
export type StatusTag = `${typeof STATUS_TAG_PREFIX}${Status}`;

/** Adds a search keyword to a page. **/
export type KeywordTag = `${typeof KEYWORD_TAG_PREFIX}${string}`;
