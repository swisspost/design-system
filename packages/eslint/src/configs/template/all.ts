import type { TSESLint } from '@typescript-eslint/utils';

import templateBaseConfig, { pluginName } from './base';
import { getAllRules } from '@utils/get-all-rules';
import { templateRules } from '@rules/template';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.ConfigArray => [
  templateBaseConfig(plugin, parser),
  {
    name: '@swisspost/design-system-eslint/template-all',
    rules: getAllRules(pluginName, templateRules),
  },
];
