import { defineConfig } from 'eslint/config';

import jest from 'eslint-plugin-jest';

export default defineConfig({
  name: 'post/jest',
  files: ['**/*.{spec,test}.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  extends: [jest.configs['flat/recommended']],
  languageOptions: {
    globals: jest.environments.globals.globals,
  },
});
