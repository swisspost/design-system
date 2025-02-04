import type { TSESLint } from '@typescript-eslint/utils';
import { getAllRules } from '../../utils/get-all-rules';
import { templateMigrationRules } from '../../rules/template/migrations';

const migrationPluginName = '@swisspost/design-system/template-migrations';

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
    [migrationPluginName]: plugin,
  },
  rules: getAllRules(migrationPluginName, templateMigrationRules),
});
