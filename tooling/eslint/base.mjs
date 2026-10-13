import { defineConfig } from 'eslint/config';

import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';

export default defineConfig(
  {
    name: 'post/globals',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    name: 'post/ts',
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    extends: [js.configs.recommended, ts.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    name: 'post/js',
    files: ['**/*.{js,jsx,mjs,cjs}'],
    extends: [ts.configs.disableTypeChecked],
  },
);
