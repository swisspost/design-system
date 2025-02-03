import type { TSESLint } from '@typescript-eslint/utils';
import pkg from '../../../package.json';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: `${pkg.name}/ts-base`,
  languageOptions: {
    parser,
    sourceType: 'module',
  },
  plugins: {
    '@swisspost/design-system': plugin,
  },
});
