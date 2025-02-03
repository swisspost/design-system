import type { TSESLint } from '@typescript-eslint/utils';
import pkg from '../../../package.json';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: `${pkg.name}/template-base`,
  languageOptions: {
    parser,
  },
  plugins: {
    '@swisspost/design-system/template': plugin,
  },
});
