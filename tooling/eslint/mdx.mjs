import { defineConfig } from 'eslint/config';

import * as mdx from 'eslint-plugin-mdx';
import react from 'eslint-plugin-react';

export default defineConfig(
  {
    name: 'post/mdx',
    ...mdx.flat,
  },
  {
    name: 'post/mdx/code-blocks',
    ...mdx.flatCodeBlocks,
  },
  {
    name: 'post/mdx/react',
    files: ['**/*.{md,mdx}'],
    extends: [react.configs.flat.recommended],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
);
