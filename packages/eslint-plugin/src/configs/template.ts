import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import templateParser from '../template-parser';
import { rules } from '../rules';

const templateRules: FlatConfig.Rules = {};

Object.entries(rules).forEach(([ruleName, rule]) => {
  if (rule.meta.docs?.category === 'template') {
    templateRules[`@swisspost-eslint/template/${ruleName}`] = 'error';
  }
});

export default (plugin: FlatConfig.Plugin): FlatConfig.Config => ({
  name: 'swisspost-eslint/template',
  files: ['**/*.html'],
  languageOptions: {
    parser: templateParser,
  },
  plugins: {
    '@swisspost-eslint/template': plugin,
  },
  rules: templateRules,
});
