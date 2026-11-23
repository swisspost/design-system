import { defineConfig } from 'vite';
import { ALIASES, PUBLIC_DIR } from '../paths';

export default defineConfig({
  publicDir: PUBLIC_DIR,
  resolve: {
    alias: ALIASES,
  },
  optimizeDeps: {
    include: [
      '@kurbar/storybook-addon-docs-stencil',
      'prettier',
      'storybook/internal/components',
      'react-syntax-highlighter/dist/esm/languages/prism/scss',
      'react/jsx-dev-runtime',
      '@storybook/addon-docs/blocks',
      'prettier/parser-html',
      'storybook/theming',
      '@storybook/addon-links',
    ],
    exclude: ['@swisspost/design-system-styles'],
  },
});
