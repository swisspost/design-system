import type { TSESLint } from '@typescript-eslint/utils';
import { parser } from 'typescript-eslint';
import { htmlParser } from '@parsers/html';

import { htmlMigrationRules } from '@rules/html/migrations';
import { tsMigrationRules } from '@rules/ts/migrations';

import htmlMigrationConfig from '@configs/html/migrations';
import tsMigrationConfig from '@configs/ts/migrations';

const htmlMigrationPlugin: TSESLint.FlatConfig.Plugin = {
  rules: htmlMigrationRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-html-migrations',
  },
};

const tsMigrationPlugin: TSESLint.FlatConfig.Plugin = {
  rules: tsMigrationRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-migrations',
  },
};

const configs = {
  htmlAll: htmlMigrationConfig(htmlMigrationPlugin, htmlParser),
  tsAll: tsMigrationConfig(tsMigrationPlugin, parser),
};

export = [configs.htmlAll, configs.tsAll];
