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
// A shard is an alphabetical range of spec files, for example "components a-h".
const SUITES = [
  {
    name: 'documentation',
    package: '@swisspost/design-system-documentation',
    dir: 'apps/documentation',
    shards: 1,
  },
  {
    name: 'components',
    package: '@swisspost/design-system-components',
    dir: 'packages/components',
    shards: 3,
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

      return { path, name: entry.name, letter: entry.name[0].toLowerCase(), tests };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Splits the alphabetically sorted specs into ranges with a similar number of tests.
// Specs starting with the same letter always stay together, so that a range can be named after
// its first and last letter.
function split(specs, count) {
  const letters = [];

  for (const spec of specs) {
    if (letters.at(-1)?.letter !== spec.letter) {
      letters.push({ letter: spec.letter, specs: [], tests: 0 });
    }

    letters.at(-1).specs.push(spec);
    letters.at(-1).tests += spec.tests;
  }

  const sum = (from, to) =>
    letters.slice(from, to).reduce((total, group) => total + group.tests, 0);

  // best[k][i]: the lowest possible size of the largest range when the letters 0 to i are split
  // into k + 1 ranges, and the index of the letter where the last of these ranges starts.
  const parts = Math.min(count, letters.length);
  const best = [letters.map((_, i) => ({ max: sum(0, i + 1), start: 0 }))];

  for (let k = 1; k < parts; k++) {
    best.push(
      letters.map((_, i) => {
        let result = { max: Infinity, start: 0 };

        for (let start = k; start <= i; start++) {
          const max = Math.max(best[k - 1][start - 1].max, sum(start, i + 1));
          if (max < result.max) result = { max, start };
        }

        return result;
      }),
    );
  }

  const shards = [];

  for (let k = parts - 1, end = letters.length; k >= 0; k--) {
    const { start } = best[k][end - 1];
    const range = letters.slice(start, end);
    const first = range[0].letter;
    const last = range.at(-1).letter;

    shards.unshift({
      range: first === last ? first : `${first}-${last}`,
      specs: range.flatMap(group => group.specs),
      tests: sum(start, end),
    });
    end = start;
  }

  return shards;
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

  for (const shard of split(getSpecs(suite.dir), suite.shards)) {
    const name = `${suite.name} ${shard.range}`;

    include.push({
      id: `${suite.name}-${shard.range}`,
      name,
      package: suite.package,
      dir: suite.dir,
      specs: shard.specs.map(spec => spec.path).join(','),
    });
    console.error(`- ${name}: ${shard.specs.length} specs, ${shard.tests} tests`);
    console.error(`  ${shard.specs.map(spec => spec.name.replace(SPEC_FILE, '')).join(', ')}`);
  }
}

const outputs = [`matrix=${JSON.stringify({ include })}`, `has-suites=${include.length > 0}`];

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, outputs.join('\n') + '\n');
} else {
  console.log(outputs.join('\n'));
}
