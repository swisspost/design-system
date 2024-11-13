import { fileURLToPath, URL } from 'url';
// https://vitejs.dev/config/

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@root/', replacement: fileURLToPath(new URL('./', import.meta.url)) },
    ],
  },
  optimizeDeps: {
    include: [
      '@kurbar/storybook-addon-docs-stencil',
      'prettier',
      '@storybook/components',
      'react-syntax-highlighter/dist/esm/languages/prism/scss',
      'react/jsx-dev-runtime',
      '@storybook/blocks',
      'prettier/parser-html',
      '@storybook/theming',
      '@storybook/addon-links',
    ],
    exclude: ['@swisspost/design-system-styles'],
  },
};
