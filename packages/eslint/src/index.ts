import type { TSESLint } from '@typescript-eslint/utils';
import { parser } from 'typescript-eslint';
import { templateParser } from '@parsers/template';

import { templateRules } from '@rules/template';
import { tsRules } from '@rules/ts';

import templateAllConfig from '@configs/template/all';
import templateRecommendedConfig from '@configs/template/recommended';
import tsAllConfig from '@configs/ts/all';
import tsRecommendedConfig from '@configs/ts/recommended';

const templatePlugin: TSESLint.FlatConfig.Plugin = {
  rules: templateRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-template',
  },
};

const tsPlugin: TSESLint.FlatConfig.Plugin = {
  rules: tsRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system',
  },
};

const configs = {
  templateAll: templateAllConfig(templatePlugin, templateParser),
  templateRecommended: templateRecommendedConfig(templatePlugin, templateParser),
  tsAll: tsAllConfig(tsPlugin, parser),
  tsRecommended: tsRecommendedConfig(tsPlugin, parser),
};

/* default and named exports allow people to use this package from both CJS and ESM. */
export default {
  templateParser,
  templatePlugin,
  tsPlugin,
  configs,
};
export { templateParser, templatePlugin, tsPlugin, configs };
