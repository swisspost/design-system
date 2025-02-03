import type { TSESLint } from '@typescript-eslint/utils';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/template-migrations',
  files: ['**/*.{html,htm}'],
  languageOptions: {
    parser,
  },
  plugins: {
    '@swisspost/design-system/template-migrations': plugin,
  },
  rules: {
    '@swisspost/design-system/template-migrations/no-deprecated-btn-rg': 'error',
  },
});
