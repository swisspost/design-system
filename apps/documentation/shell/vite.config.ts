import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const docsRoot = fileURLToPath(new URL('..', import.meta.url));

/**
 * The shell is built into the Storybook output folder, next to `iframe.html` and `index.json`,
 * so both are served from one origin. Storybook copies `public/` and the static dirs.
 */
export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: '/',
  // in dev, serve the favicons and `/assets` ourselves; in builds Storybook copies them
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
  // `vite preview` serves the full build (shell and preview on one origin); it must not inherit the dev proxy
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
    preprocessorOptions: {
      scss: {
        loadPaths: [`${docsRoot}/node_modules`],
      },
    },
  },
}));
