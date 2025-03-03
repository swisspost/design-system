import type { TSESLint } from '@typescript-eslint/utils';

import htmlBaseConfig, { pluginName } from './base';
import { getAllRules } from '../../utils/get-all-rules';
import { htmlRules } from '../../rules/html';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  htmlBaseConfig(plugin, parser),
  {
    name: '@swisspost/design-system-eslint/html-all',
    rules: getAllRules(pluginName, htmlRules),
  },
];
