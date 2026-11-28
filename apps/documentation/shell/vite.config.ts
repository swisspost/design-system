import { setTimeout } from 'node:timers/promises';
import { defineConfig, type Plugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { DOCS_ROOT, NODE_MODULES, OUT_DIR, PUBLIC_DIR, SHELL_ROOT } from '../paths';

export default defineConfig(({ command }) => ({
  root: SHELL_ROOT,
  base: '/',
  plugins: [tsconfigPaths({ root: DOCS_ROOT }), openWhenReady()],
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

/**
 * Delays `--open` until the preview is ready.
 */
function openWhenReady(): Plugin {
  let open = false;

  return {
    name: 'open-when-ready',
    apply: 'serve',
    config(config) {
      open = Boolean(config.server?.open);
      return { server: { open: false } };
    },
    configureServer(server) {
      if (!open) return;

      const isReady = () =>
        fetch(`${server.config.env.VITE_PREVIEW_ORIGIN}/index.json`)
          .then(response => response.ok)
          .catch(() => false);

      const waitAndOpen = async () => {
        server.config.logger.info('Waiting for preview to become ready...');

        while (!server.resolvedUrls || !(await isReady())) await setTimeout(500);

        server.openBrowser();
      };

      server.httpServer?.once('listening', () => void waitAndOpen());
    },
  };
}
