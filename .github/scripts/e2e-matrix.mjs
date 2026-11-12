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

// The number of shards follows the number of tests: a suite is split into as many shards as
// needed to keep each one at about `testsPerShard` tests, and each shard runs on its own runner.
// A shard is an alphabetical range of spec files, for example "components a-h".
// Small suites that are not split and share the same `job` run together on a single runner.
const SUITES = [
  {
    name: 'documentation',
    package: '@swisspost/design-system-documentation',
    dir: 'apps/documentation',
    job: 'small',
    testsPerShard: 300,
  },
  {
    name: 'components',
    package: '@swisspost/design-system-components',
    dir: 'packages/components',
    testsPerShard: 300,
  },
  {
    name: 'internet-header',
    package: '@swisspost/internet-header',
    dir: 'packages/internet-header',
    job: 'small',
    testsPerShard: 300,
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

      // Names that do not start with a letter are sorted first and belong to the "a" range.
      const letter = entry.name.toLowerCase().match(/^[a-z]/)?.[0] ?? 'a';

      return { path, name: entry.name, letter, tests };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Splits the alphabetically sorted specs into ranges with a similar number of tests.
// Specs starting with the same letter always stay together, and the ranges are named so that
// together they cover the whole alphabet (for example a-h, i-q, r-z). The boundaries are
// calculated on every run: a new spec file needs no change here, whatever letter it starts with.
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

    shards.unshift({
      first: letters[start].letter,
      specs: letters.slice(start, end).flatMap(group => group.specs),
      tests: sum(start, end),
    });
    end = start;
  }

  // A range ends right before the first letter of the next one, the last one ends with "z".
  shards.forEach((shard, index) => {
    const next = shards[index + 1];
    const from = index === 0 ? 'a' : shard.first;
    const to = next ? String.fromCharCode(next.first.charCodeAt(0) - 1) : 'z';

    shard.range = from === to ? from : `${from}-${to}`;
  });

  return shards;
}

const affected = getAffectedPackages();
const include = [];
const combined = new Map();

const entry = (id, name, suites, specs) => ({
  id,
  name,
  packages: suites.map(suite => suite.package).join(' '),
  screenshots: suites.map(suite => `${suite.dir}/cypress/screenshots`).join('\n'),
  specs,
});

for (const suite of SUITES) {
  if (affected && !affected.has(suite.package)) {
    console.error(`- ${suite.name}: skipped, not affected by the changes`);
    continue;
  }

  const specs = getSpecs(suite.dir);
  const totalTests = specs.reduce((total, spec) => total + spec.tests, 0);
  const shards = Math.max(1, Math.ceil(totalTests / suite.testsPerShard));

  // Without a spec list, Cypress runs everything that matches its `specPattern`.
  if (shards <= 1) {
    console.error(`- ${suite.name}: all specs`);

    if (suite.job) {
      combined.set(suite.job, [...(combined.get(suite.job) ?? []), suite]);
    } else {
      include.push(entry(suite.name, suite.name, [suite], ''));
    }

    continue;
  }

  for (const shard of split(specs, shards)) {
    const name = `${suite.name} ${shard.range}`;

    include.push(
      entry(
        `${suite.name}-${shard.range}`,
        name,
        [suite],
        shard.specs.map(spec => spec.path).join(','),
      ),
    );
    console.error(`- ${name}: ${shard.specs.length} specs, ${shard.tests} tests`);
    console.error(`  ${shard.specs.map(spec => spec.name.replace(SPEC_FILE, '')).join(', ')}`);
  }
}

for (const suites of combined.values()) {
  include.push(
    entry(
      suites.map(suite => suite.name).join('-'),
      suites.map(suite => suite.name).join(' + '),
      suites,
      '',
    ),
  );
}

const outputs = [`matrix=${JSON.stringify({ include })}`, `has-suites=${include.length > 0}`];

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, outputs.join('\n') + '\n');
} else {
  console.log(outputs.join('\n'));
}
