import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const previewRoot = dirname(fileURLToPath(import.meta.url));
const docsRoot = dirname(previewRoot);

/**
 * Vite config of the Storybook preview.
 * Storybook loads it because this folder is the parent of its config dir (`preview/.storybook`).
 */
export default defineConfig({
  // the site root (favicons, `_redirects`, ...) is shared with the shell
  publicDir: `${docsRoot}/public`,
  resolve: {
    alias: {
      '@preview': previewRoot,
      '@shared': `${docsRoot}/shared`,
    },
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
