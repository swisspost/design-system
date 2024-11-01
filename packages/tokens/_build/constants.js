import { resolve } from 'path';

export const SOURCE_PATH = resolve('./tokensstudio-generated/');
export const OUTPUT_PATH = resolve('./dist/');
export const FILE_HEADER =
  '// Do not edit manually!\n// This file was generated on:\n// {date} by the @swisspost/design-system-tokens package build command\n\n';

export const EXPLICIT_COMPONENT_LAYER_GROUPNAMES = [
  'elements',
  'components',
  'utilities',
  'helpers',
];
export const EXPLICIT_FIGMAONLY_GROUPNAMES = ['figmaonly'];
export const EXPLICIT_FIGMAONLY_SETNAMES = ['figmaonly'];
export const TOKENSET_LAYERS = {
  core: 'core',
  semantic: 'semantic',
  component: 'component',
};
export const TOKENSET_PREFIX = 'post';
