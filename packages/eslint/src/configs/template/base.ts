import type { TSESLint } from '@typescript-eslint/utils';

export const pluginName = '@swisspost/design-system/template';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/template-base',
  files: ['**/*.{html,htm}'],
  languageOptions: {
    parser,
  },
  plugins: {
    [pluginName]: plugin,
  },
});
