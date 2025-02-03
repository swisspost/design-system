import type { TSESLint } from '@typescript-eslint/utils';
import { parser } from 'typescript-eslint';
import * as templateParserBase from './parsers/template';

import { templateRules } from './rules/template';
import { tsRules } from './rules/ts';

import templateAllConfig from './configs/template/all';
import tsAllConfig from './configs/ts/all';

// NOTE - we cannot migrate this to an import statement because it will make TSC copy the package.json to the dist folder
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const version: string = require('../package.json').version;

const templateParser: TSESLint.FlatConfig.Parser = {
  parseForESLint: templateParserBase.parseForESLint,
  meta: {
    name: `@swisspost/design-system-eslint/template-parser`,
    version,
  },
};

const templatePlugin: TSESLint.FlatConfig.Plugin = {
  rules: templateRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-template',
    version,
  },
};

const tsPlugin: TSESLint.FlatConfig.Plugin = {
  rules: tsRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system',
    version,
  },
};

const configs = {
  templateAll: templateAllConfig(templatePlugin, templateParser),
  tsAll: tsAllConfig(tsPlugin, parser),
};

/* default and named exports allow people to use this package from both CJS and ESM. */
export default {
  templateParser,
  templatePlugin,
  tsPlugin,
  configs,
};
export { templateParser, templatePlugin, tsPlugin, configs };
