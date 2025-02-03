import type { TSESLint } from '@typescript-eslint/utils';
import pkg from '../package.json';
import * as templateParserBase from './parsers/template';
import { templateRules } from './rules/template';
import templateAllConfig from './configs/template/all';

const templateParser: TSESLint.FlatConfig.Parser = {
  parseForESLint: templateParserBase.parseForESLint,
  meta: {
    name: `${pkg.name}/template-parser`,
    version: pkg.version,
  },
};

const templatePlugin: TSESLint.FlatConfig.Plugin = {
  rules: templateRules,
  meta: {
    name: '@swisspost/eslint-plugin-design-system-template',
    version: pkg.version,
  },
};

const configs = {
  templateAll: templateAllConfig(templatePlugin, templateParser),
};

/* default and named exports allow people to use this package from both CJS and ESM. */
export default {
  templateParser,
  templatePlugin,
  configs,
};
export { templateParser, templatePlugin, configs };
