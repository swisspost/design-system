import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'f9aegu',
  e2e: {
    baseUrl: 'http://localhost:9001',
    specPattern: ['cypress/**/*.snapshot.{ts,tsx}'],
    includeShadowDom: true,
    viewportWidth: 1024,
    viewportHeight: 576,
  },
  includeShadowDom: true,
  retries: {
    runMode: 1,
  },
  video: false,
});
