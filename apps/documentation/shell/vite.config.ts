import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { DOCS_ROOT, NODE_MODULES, OUT_DIR, PUBLIC_DIR, SHELL_ROOT } from '../paths';

export default defineConfig(({ command }) => ({
  root: SHELL_ROOT,
  base: '/',
  plugins: [tsconfigPaths({ root: DOCS_ROOT })],
  publicDir: command === 'serve' ? PUBLIC_DIR : false,
  server: {
    port: 9000,
    strictPort: true,
    proxy: {
      '/styles': 'http://localhost:9001',
      '/post-icons': 'http://localhost:9001',
    },
  },
  preview: {
    port: 9000,
    strictPort: true,
    proxy: {},
  },
  build: {
    outDir: OUT_DIR,
    emptyOutDir: false,
    assetsDir: 'shell',
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: { loadPaths: [NODE_MODULES] },
    },
  },
}));
