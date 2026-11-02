import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postReact from '@swisspost/design-system-eslint-config/react';

export default defineConfig(
  globalIgnores(['dist/', 'src/icons-generated/', 'src/stencil-generated/']),
  post,
  postReact,
);
