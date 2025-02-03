import type { TSESLint } from '@typescript-eslint/utils';
import pkg from '../../../package.json';

import tsBaseConfig from './base';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  tsBaseConfig(plugin, parser),
  {
    name: `${pkg.name}/ts-all`,
    rules: {},
  },
];
