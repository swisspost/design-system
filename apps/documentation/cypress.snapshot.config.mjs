import { defineConfig } from 'cypress';

import post from '@swisspost/design-system-cypress-config';

export default defineConfig({
  ...post,
  projectId: 'f9aegu',
  e2e: {
    ...post.e2e,
    baseUrl: 'http://localhost:9001',
    specPattern: ['cypress/**/*.snapshot.{ts,tsx}'],
  },
});
