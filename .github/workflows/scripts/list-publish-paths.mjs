// This script lists the paths that the publishable workspace packages publish to npm.
// It is used by the release workflow to archive only the build output that is actually published
// (no build caches like .stencil, .angular or www) and to validate that archive before publishing.
//
// Usage: pnpm m ls --depth=0 --json | node .github/workflows/scripts/list-publish-paths.mjs
// Prints one path per line, relative to the current working directory.

import fs from 'node:fs';
import path from 'node:path';

// The changelog generator is rebuilt in the publishing job, because it is executed there.
const SKIPPED_PACKAGES = new Set(['@swisspost/design-system-changelog-github']);

const root = process.cwd();
const monorepo = JSON.parse(fs.readFileSync(0, 'utf8'));

const toRelative = absolutePath => path.relative(root, absolutePath).split(path.sep).join('/');

// For glob entries in `files` (e.g. `dist/*.js`), use the directory before the first glob character.
const staticPart = entry => {
  const globStart = entry.search(/[*?[{]/);
  return globStart === -1 ? entry : path.posix.dirname(entry.slice(0, globStart) + 'x');
};

const publishPaths = monorepo
  .filter(pkg => pkg.path !== root && pkg.private !== true && !SKIPPED_PACKAGES.has(pkg.name))
  .flatMap(pkg => {
    const manifest = JSON.parse(fs.readFileSync(path.join(pkg.path, 'package.json'), 'utf8'));

    // pnpm publishes the content of `publishConfig.directory` if it is set, otherwise the `files`.
    // Without both, npm publishes the whole package directory.
    const entries = manifest.publishConfig?.directory
      ? [manifest.publishConfig.directory]
      : (manifest.files ?? ['.']);

    return entries
      .filter(entry => !entry.startsWith('!'))
      .map(entry => toRelative(path.resolve(pkg.path, staticPart(entry))));
  });

for (const publishPath of publishPaths) {
  if (publishPath === '' || publishPath.startsWith('..') || path.isAbsolute(publishPath)) {
    throw new Error(`Publish path is outside of the workspace packages: ${publishPath}`);
  }
}

if (publishPaths.length === 0) {
  throw new Error('No publishable packages found.');
}

console.log([...new Set(publishPaths)].join('\n'));
