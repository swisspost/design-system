import type { TSESLint } from '@typescript-eslint/utils';
import { parser } from 'typescript-eslint';
import { htmlParser } from './parsers/html';

import { htmlRules } from './rules/html';
import { tsRules } from './rules/ts';
import { dsLintingRules } from './rules';

import htmlAllConfig from './configs/html/all';
import htmlRecommendedConfig from './configs/html/recommended';
import tsAllConfig from './configs/ts/all';
import tsRecommendedConfig from './configs/ts/recommended';
import stencilRecommendedConfig from './configs/stencil/recommended';

const htmlPlugin: TSESLint.FlatConfig.Plugin = {
  rules: htmlRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-html',
  },
};

const tsPlugin: TSESLint.FlatConfig.Plugin = {
  rules: {
    ...tsRules, // Include existing (currently empty) TS rules
    ...dsLintingRules, // Include Design System Sepcific
  },
  meta: {
    name: '@swisspost/eslint-plugin-design-system',
  },
};

const configs = {
  htmlAll: htmlAllConfig(htmlPlugin, htmlParser),
  htmlRecommended: htmlRecommendedConfig(htmlPlugin, htmlParser),
  tsAll: tsAllConfig(tsPlugin, parser),
  tsRecommended: tsRecommendedConfig(tsPlugin, parser),
  stencilRecommended: stencilRecommendedConfig(tsPlugin, parser),
};

/* default and named exports allow people to use this package from both CJS and ESM. */
export default {
  htmlParser,
  htmlPlugin,
  tsPlugin,
  configs,
};
export { htmlParser, htmlPlugin, tsPlugin, configs };
