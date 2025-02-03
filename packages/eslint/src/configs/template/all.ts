import type { TSESLint } from '@typescript-eslint/utils';
import pkg from '../../../package.json';

import templateBaseConfig from './base';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  templateBaseConfig(plugin, parser),
  {
    name: `${pkg.name}/template-all`,
    rules: {
      '@swisspost/design-system/template/no-deprecated-btn-rg': 'error',
    },
  },
];
