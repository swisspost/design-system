import type { TSESLint } from '@typescript-eslint/utils';
import { getAllRules } from '@utils/get-all-rules';
import { tsMigrationRules } from '@rules/ts/migrations';

const migrationPluginName = '@swisspost/design-system/migrations';

export default (
  plugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/ts-migrations',
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    parser,
    sourceType: 'module',
  },
  plugins: {
    [migrationPluginName]: plugin,
  },
  rules: getAllRules(migrationPluginName, tsMigrationRules),
});
