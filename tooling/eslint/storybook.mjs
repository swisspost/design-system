import { defineConfig } from 'eslint/config';

import storybook from 'eslint-plugin-storybook';

export default defineConfig({
  name: 'post/storybook',
  extends: [storybook.configs['flat/recommended']],
});
