import { resolve } from 'path';

export const SOURCE_PATH = resolve('./tokensstudio-generated/');
export const OUTPUT_PATH = resolve('./dist/');
export const FILE_HEADER =
  '// Do not edit manually!\n// This file was generated on:\n// {date} by the @swisspost/design-system-tokens package build command\n\n';

export const SCSS_MAP_PREFIX = 'post';
