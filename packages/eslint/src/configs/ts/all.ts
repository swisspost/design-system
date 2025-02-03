import type { TSESLint } from '@typescript-eslint/utils';

import tsBaseConfig from './base';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  tsBaseConfig(plugin, parser),
  {
    name: '@swisspost/design-system-eslint/ts-all',
    rules: {},
  },
];
