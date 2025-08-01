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
  // https://www.oddbird.net/2024/08/14/sass-compiler/
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
};
