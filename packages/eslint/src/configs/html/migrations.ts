import type { TSESLint } from '@typescript-eslint/utils';
import { getAllRules } from '../../utils/get-all-rules';
import { htmlMigrationRules } from '../../rules/html/migrations';

const migrationPluginName = '@swisspost/design-system/html-migrations';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/html-migrations',
  files: ['**/*.{html,htm}'],
  languageOptions: {
    parser,
  },
  plugins: {
    [migrationPluginName]: plugin,
  },
  rules: getAllRules(migrationPluginName, htmlMigrationRules),
});
