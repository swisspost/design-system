import type { TSESLint } from '@typescript-eslint/utils';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/migrations',
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    parser,
    sourceType: 'module',
  },
  plugins: {
    '@swisspost/design-system/migrations': plugin,
  },
  rules: {},
});
