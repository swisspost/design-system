import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postAngular from '@swisspost/design-system-eslint-config/angular';

export default defineConfig(globalIgnores(['dist/', 'out-tsc/']), post, postAngular, {
  // Example application. Does not use Post branded selectors.
  rules: {
    '@angular-eslint/component-class-suffix': 'off',
    '@angular-eslint/component-selector': 'off',
    '@angular-eslint/directive-class-suffix': 'off',
    '@angular-eslint/directive-selector': 'off',
  },
});
