import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import { rules } from './rules';

import templateConfig from './configs/template';

const plugin: FlatConfig.Plugin = {
  meta: {},
  configs: {},
  rules,
};

plugin.meta = {
  name: `@swisspost-eslint/eslint-plugin`,
};

plugin.configs = {
  template: templateConfig(plugin),
};

export = plugin;
