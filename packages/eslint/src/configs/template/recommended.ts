import type { TSESLint } from '@typescript-eslint/utils';

import templateBaseConfig, { pluginName } from './base';
import { templateRules } from '../../rules/template';
import { getRecommendedRules } from '../../utils/get-recommended-rules';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  templateBaseConfig(plugin, parser),
  {
    name: '@swisspost/design-system-eslint/template-recommended',
    rules: getRecommendedRules(pluginName, templateRules),
  },
];
