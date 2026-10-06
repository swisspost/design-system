import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';

export default defineConfig(globalIgnores(['dist/', 'browsers/']), post);
