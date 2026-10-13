import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postAngular from '@swisspost/design-system-eslint-config/angular';

export default defineConfig(
  globalIgnores(['dist/', 'out-tsc/', '**/stencil-generated/']),
  post,
  postAngular,
);
