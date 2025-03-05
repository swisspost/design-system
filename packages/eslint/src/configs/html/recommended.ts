import type { TSESLint } from '@typescript-eslint/utils';

import htmlBaseConfig, { pluginName } from './base';
import { htmlRules } from '../../rules/html';
import { getRecommendedRules } from '../../utils/get-recommended-rules';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  htmlBaseConfig(plugin, parser),
  {
    name: '@swisspost/design-system-eslint/html-recommended',
    rules: getRecommendedRules(pluginName, htmlRules),
  },
];
