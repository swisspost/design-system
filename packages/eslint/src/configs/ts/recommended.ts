import type { TSESLint } from '@typescript-eslint/utils';
import { tsRules } from '../../rules/ts';
import tsBaseConfig, { pluginName } from './base';
import { getRecommendedRules } from '../../utils/get-recommended-rules';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  tsBaseConfig(plugin, parser),
  {
    name: '@swisspost/design-system-eslint/ts-recommended',
    rules: getRecommendedRules(pluginName, tsRules),
  },
];
