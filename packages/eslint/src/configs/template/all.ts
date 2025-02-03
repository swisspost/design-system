import type { TSESLint } from '@typescript-eslint/utils';

import templateBaseConfig from './base';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  templateBaseConfig(plugin, parser),
  {
    name: '@swisspost/design-system-eslint/template-all',
    rules: {},
  },
];
