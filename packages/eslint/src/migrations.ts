import type { TSESLint } from '@typescript-eslint/utils';
import { parser } from 'typescript-eslint';
import * as templateParser from './parsers/template';

import { templateMigrationRules } from './rules/template/migrations';
import { tsMigrationRules } from './rules/ts/migrations';

import templateMigrationConfig from './configs/template/migrations';
import tsMigrationConfig from './configs/ts/migrations';

const templateMigrationPlugin: TSESLint.FlatConfig.Plugin = {
  rules: templateMigrationRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-template-migrations',
  },
};

const tsMigrationPlugin: TSESLint.FlatConfig.Plugin = {
  rules: tsMigrationRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-migrations',
  },
};

const configs = {
  templateAll: templateMigrationConfig(templateMigrationPlugin, templateParser),
  tsAll: tsMigrationConfig(tsMigrationPlugin, parser),
};

export = [configs.templateAll, configs.tsAll];
