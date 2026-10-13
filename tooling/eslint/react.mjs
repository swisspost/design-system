import { defineConfig } from 'eslint/config';

import react from 'eslint-plugin-react';

export default defineConfig({
  name: 'post/react',
  extends: [react.configs.flat.recommended],
  settings: {
    react: {
      version: 'detect',
    },
  },
});
