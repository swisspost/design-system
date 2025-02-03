import type { TSESLint } from '@typescript-eslint/utils';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/ts-base',
  languageOptions: {
    parser,
    sourceType: 'module',
  },
  plugins: {
    '@swisspost/design-system': plugin,
  },
});
