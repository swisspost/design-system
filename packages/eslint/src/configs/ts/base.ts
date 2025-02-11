import type { TSESLint } from '@typescript-eslint/utils';

export const pluginName = '@swisspost/design-system';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/ts-base',
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    parser,
    sourceType: 'module',
  },
  plugins: {
    [pluginName]: plugin,
  },
});
