import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const docsRoot = fileURLToPath(new URL('..', import.meta.url));

/**
 * The documentation shell, which replaces Storybook's manager UI.
 *
 * Dev: the shell runs on port 9000, the Storybook preview on its own dev server on port 9001.
 * Build: the shell is built into the Storybook output folder, next to `iframe.html` and `index.json`,
 * so both are served from one origin.
 */
export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: '/',
  // in dev, serve the favicons and `/assets` ourselves; in builds Storybook already copies them
  publicDir: command === 'serve' ? `${docsRoot}/public` : false,
  server: {
    port: 9000,
    strictPort: true,
    // the design-system styles and icons are Storybook static dirs (see `.storybook/main.ts`)
    proxy: {
      '/styles': 'http://localhost:9001',
      '/post-icons': 'http://localhost:9001',
    },
  },
  // `vite preview` serves the full build (shell and preview on one origin), it must not inherit the dev proxy
  preview: {
    port: 9000,
    strictPort: true,
    proxy: {},
  },
  build: {
    outDir: `${docsRoot}/storybook-static`,
    emptyOutDir: false,
    assetsDir: 'shell',
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        loadPaths: [`${docsRoot}/node_modules`],
      },
    },
  },
}));
