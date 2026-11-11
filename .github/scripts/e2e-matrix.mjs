#!/usr/bin/env node

/**
 * Builds the job matrix of the "End to end tests" workflow.
 *
 * Only the suites of packages that changed (or depend on a changed package) are run, and large
 * suites are split into shards so that they run on several runners in parallel.
 *
 * Usage: node e2e-matrix.mjs
 * Environment:
 *   BASE_REF  Git ref to compare the working tree with (default: origin/main).
 *   RUN_ALL   Set to "true" to run every suite, no matter what changed.
 * Output: `matrix=<json>` and `has-suites=<true|false>` in $GITHUB_OUTPUT, report on stderr.
 */

import { execFileSync } from 'node:child_process';
import { appendFileSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

// Increase `shards` when a suite becomes the slowest job, each shard runs on its own runner.
const SUITES = [
  {
    name: 'documentation',
    package: '@swisspost/design-system-documentation',
    dir: 'apps/documentation',
    shards: 2,
  },
  {
    name: 'components',
    package: '@swisspost/design-system-components',
    dir: 'packages/components',
    shards: 2,
  },
  {
    name: 'internet-header',
    package: '@swisspost/internet-header',
    dir: 'packages/internet-header',
    shards: 1,
  },
];

// Changes to these files can break every suite.
const WORKFLOW_FILES = ['.github/workflows/e2e-tests.yaml', '.github/scripts/e2e-matrix.mjs'];

// Same location as the default Cypress `specPattern`, which none of the suites overrides.
const SPEC_FOLDER = 'cypress/e2e';
const SPEC_FILE = /\.cy\.[jt]sx?$/;

const baseRef = process.env.BASE_REF || 'origin/main';

function run(command, args) {
  return execFileSync(command, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

function getAffectedPackages() {
  if (process.env.RUN_ALL === 'true') return null;

  const changedWorkflowFiles = run('git', ['diff', '--name-only', baseRef, '--', ...WORKFLOW_FILES])
    .split('\n')
    .filter(Boolean);

  if (changedWorkflowFiles.length > 0) return null;

  // Same selection as `pnpm --filter "...[origin/main]"`: changed packages and their dependents.
  const packages = JSON.parse(
    run('pnpm', ['ls', '--filter', `...[${baseRef}]`, '--depth', '-1', '--json']) || '[]',
  );

  return new Set(packages.map(pkg => pkg.name));
}

function getSpecs(dir) {
  return readdirSync(join(dir, SPEC_FOLDER), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && SPEC_FILE.test(entry.name))
    .map(entry => {
      const path = relative(dir, join(entry.parentPath, entry.name)).replaceAll('\\', '/');

      // The list is passed to `cypress run --spec` as a comma-separated argument.
      if (!/^[\w./-]+$/.test(path)) {
        throw new Error(`Unsupported characters in the spec file name "${path}".`);
      }

      // The number of tests is a cheap approximation of how long a spec takes.
      const tests = readFileSync(join(dir, path), 'utf8').match(/\bit(\.\w+)?\(/g)?.length ?? 0;

      return { path, weight: tests + 1 };
    })
    .sort((a, b) => b.weight - a.weight || a.path.localeCompare(b.path));
}

// Greedy distribution: the heaviest spec always goes to the shard with the lowest load.
function split(specs, count) {
  const shards = Array.from({ length: count }, () => ({ specs: [], weight: 0 }));

  for (const spec of specs) {
    const lightest = shards.reduce((min, shard) => (shard.weight < min.weight ? shard : min));
    lightest.specs.push(spec.path);
    lightest.weight += spec.weight;
  }

  return shards.filter(shard => shard.specs.length > 0);
}

const affected = getAffectedPackages();
const include = [];

for (const suite of SUITES) {
  if (affected && !affected.has(suite.package)) {
    console.error(`- ${suite.name}: skipped, not affected by the changes`);
    continue;
  }

  // Without a spec list, Cypress runs everything that matches its `specPattern`.
  if (suite.shards <= 1) {
    include.push({
      id: suite.name,
      name: suite.name,
      package: suite.package,
      dir: suite.dir,
      specs: '',
    });
    console.error(`- ${suite.name}: all specs`);
    continue;
  }

  const shards = split(getSpecs(suite.dir), suite.shards);

  shards.forEach((shard, index) => {
    const name = `${suite.name} ${index + 1}/${shards.length}`;

    include.push({
      id: `${suite.name}-${index + 1}`,
      name,
      package: suite.package,
      dir: suite.dir,
      specs: shard.specs.sort().join(','),
    });
    console.error(`- ${name}: ${shard.specs.length} specs (weight ${shard.weight})`);
  });
}

const outputs = [`matrix=${JSON.stringify({ include })}`, `has-suites=${include.length > 0}`];

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, outputs.join('\n') + '\n');
} else {
  console.log(outputs.join('\n'));
}
