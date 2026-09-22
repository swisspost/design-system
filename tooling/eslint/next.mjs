import { defineConfig } from 'eslint/config';

import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig({
  name: 'post/next',
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'react': react,
    'react-hooks': reactHooks,
    '@next/next': next,
  },
  rules: {
    ...react.configs['jsx-runtime'].rules,
    ...reactHooks.configs.recommended.rules,
    ...next.configs.recommended.rules,
    ...next.configs['core-web-vitals'].rules,
  },
});
