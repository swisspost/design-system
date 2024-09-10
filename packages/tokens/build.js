import {
  setup,
  createTokenSetFiles,
  createOutputFiles,
  removeTokenSetFiles,
} from './_build/methods.js';

/**
 * Build process
 */
const builtTime = performance.now();

await setup();
await createTokenSetFiles();
await createOutputFiles();
await removeTokenSetFiles();

console.log(`\x1b[32m✓ Tokens built in ${Math.round(performance.now() - builtTime)}ms\x1b[0m`);
