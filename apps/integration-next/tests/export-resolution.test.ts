import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { exports as resolveExports } from 'resolve.exports';

const PKG_DIR = resolve('node_modules', '@swisspost/design-system-components-react');
const pkg = JSON.parse(readFileSync(resolve(PKG_DIR, 'package.json'), 'utf-8'));

/**
 * Condition sets used by Next.js webpack and other bundlers:
 * - RSC: Server Components (react-server layer)
 * - SSR: Client Components rendered on the server (Node.js)
 * - CSR: Client Components rendered in the browser (also covers Vite, CRA)
 * - FALLBACK: No environment-specific condition, only import + default
 */
const RSC = ['react-server', 'node', 'import', 'default'];
const SSR = ['node', 'import', 'default'];
const CSR = ['browser', 'import', 'default'];
const FALLBACK = ['import', 'default'];

const SCENARIOS = [
  { name: 'Next.js Server Component RSC', conditions: RSC, isServer: true },
  { name: 'Next.js Client Component SSR', conditions: SSR, isServer: true },
  { name: 'Next.js Client Component CSR', conditions: CSR, isServer: false },
  { name: 'React client-only project CSR', conditions: CSR, isServer: false },
  { name: 'No environment condition CSR', conditions: FALLBACK, isServer: false },
] as const;

/**
 * Uses the `resolve.exports` package to simulate how bundlers resolve
 * exports under different condition sets.
 *
 * Note: `unsafe: true` disables the implicit `node` + `import` defaults from `resolve.exports`
 * so we can test exact condition sets as used by each bundler environment.
 */
function resolveWithConditions(subpath: string, conditions: string[]): string | undefined {
  const result = resolveExports(pkg, subpath, { conditions, unsafe: true });
  return result?.[0];
}

describe('Package export resolution for main entry point (".")', () => {
  it.each(SCENARIOS)('$name\t→ resolves to the correct entry file', ({ conditions, isServer }) => {
    expect(resolveWithConditions('.', [...conditions])).toBe(
      isServer ? './dist/index.server.js' : './dist/index.js',
    );
  });
});

describe('Package export resolution for standalone components ("./*")', () => {
  it.each(SCENARIOS)(
    '$name\t→ resolves to the correct standalone file',
    ({ conditions, isServer }) => {
      expect(resolveWithConditions('./post-icon', [...conditions])).toBe(
        isServer
          ? './dist/stencil-generated/standalone/post-icon.server.js'
          : './dist/stencil-generated/standalone/post-icon.js',
      );
    },
  );
});
