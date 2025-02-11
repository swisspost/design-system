import type { TSESLint } from '@typescript-eslint/utils';

export const pluginName = '@swisspost/design-system/html';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/html-base',
  files: ['**/*.{html,htm}'],
  languageOptions: {
    parser,
  },
  plugins: {
    [pluginName]: plugin,
  },
});
