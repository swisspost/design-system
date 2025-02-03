import type { TSESLint } from '@typescript-eslint/utils';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/template-base',
  languageOptions: {
    parser,
  },
  plugins: {
    '@swisspost/design-system/template': plugin,
  },
});
