/**
 * Line coverage for the legacy widget, computed from the raw V8 dumps the Playwright fixture
 * writes out.
 *
 *   pnpm coverage
 *
 * This does the V8 -> source-map mapping by hand rather than via v8-to-istanbul or
 * monocart-coverage-reports. Both of those reported a flat 100% here: the widget bundle's
 * outermost range is a single `count: 1` span over the whole file, and they let it win over the
 * narrow `count: 0` ranges nested inside it. V8 semantics are the opposite way round - the
 * innermost range containing an offset is the authoritative one. `verify()` below pins that
 * distinction against code the suite provably never runs.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { TraceMap, eachMapping } from '@jridgewell/trace-mapping';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const COVERAGE_DIR = join(ROOT, '.coverage');
const BUILD_DIR = join(ROOT, 'www/build');
const OUT_DIR = join(ROOT, '.coverage-report');
const TARGET = 'src/legacy/klp-login-widget.js';

if (!existsSync(COVERAGE_DIR)) {
  console.error('No coverage data. Run: pnpm coverage');
  process.exit(1);
}

/** Innermost range wins, which is what makes a nested `count: 0` beat the enclosing `count: 1`. */
function countsFor(functions, length) {
  const counts = new Int32Array(length).fill(-1);
  const ranges = functions
    .flatMap(fn => fn.ranges)
    .sort((a, b) => b.endOffset - b.startOffset - (a.endOffset - a.startOffset));

  for (const r of ranges) counts.fill(r.count, r.startOffset, Math.min(r.endOffset, length));

  return counts;
}

const bundles = new Map();

for (const file of readdirSync(COVERAGE_DIR).filter(f => f.endsWith('.json'))) {
  for (const entry of JSON.parse(readFileSync(join(COVERAGE_DIR, file), 'utf8'))) {
    if (!entry.source || !entry.url.includes('/build/')) continue;

    const name = basename(new URL(entry.url).pathname);
    if (!existsSync(join(BUILD_DIR, `${name}.map`))) continue;

    const counts = countsFor(entry.functions, entry.source.length);
    const existing = bundles.get(name);

    if (!existing) {
      bundles.set(name, { name, source: entry.source, counts });
      continue;
    }

    for (let i = 0; i < counts.length; i++) {
      if (counts[i] > existing.counts[i]) existing.counts[i] = counts[i];
    }
  }
}

const covered = new Set();
const seen = new Set();

for (const bundle of bundles.values()) {
  const map = new TraceMap(readFileSync(join(BUILD_DIR, `${bundle.name}.map`), 'utf8'));

  const lineStarts = [0];
  for (let i = 0; i < bundle.source.length; i++) {
    if (bundle.source[i] === '\n') lineStarts.push(i + 1);
  }

  // Stencil minifies after emitting the map and does not remap, so a prod build ships a map that
  // describes a file that no longer exists. Feeding minified offsets through it silently yields
  // nonsense (this is what made v8-to-istanbul and monocart report a flat 100%). Coverage must run
  // against `stencil build --dev`.
  let maxGeneratedLine = 0;
  eachMapping(map, m => {
    if (m.generatedLine > maxGeneratedLine) maxGeneratedLine = m.generatedLine;
  });

  if (maxGeneratedLine > lineStarts.length) {
    console.error(
      `${bundle.name}: source map covers ${maxGeneratedLine} lines but the bundle has ` +
        `${lineStarts.length}. The bundle is minified and the map is not. Build with --dev.`,
    );
    process.exit(1);
  }

  eachMapping(map, m => {
    if (m.originalLine == null || !m.source || !m.source.replace(/\\/g, '/').endsWith(TARGET)) {
      return;
    }

    const offset = lineStarts[m.generatedLine - 1] + m.generatedColumn;
    const count = bundle.counts[offset];
    if (count === undefined || count < 0) return;

    seen.add(m.originalLine);
    if (count > 0) covered.add(m.originalLine);
  });
}

if (!seen.size) {
  console.error(`No mappings found for ${TARGET}.`);
  process.exit(1);
}

const src = readFileSync(join(ROOT, TARGET), 'utf8').split('\n');
const uncovered = [...seen].filter(n => !covered.has(n)).sort((a, b) => a - b);

/**
 * Ground truth in both directions. The first list can only run in code paths no browser reaches:
 * the IE branch, and an init-time keepalive that tests `sessionData` before the asynchronous
 * subscribe has had a chance to set it. The second list is covered by the very first smoke test,
 * so seeing it uncovered means the mapping broke rather than the suite regressing.
 */
function verify() {
  const mustBeUncovered = ["window.attachEvent('onmessage'", 'Running keepAliveSessionsOnInit'];
  const mustBeCovered = ['const version =', 'function renderWidget()'];
  const problems = [];

  for (const needle of mustBeUncovered) {
    const line = src.findIndex(l => l.includes(needle)) + 1;
    if (line && covered.has(line)) problems.push(`${needle} (line ${line}) reported as covered`);
  }

  for (const needle of mustBeCovered) {
    const line = src.findIndex(l => l.includes(needle)) + 1;
    if (line && !covered.has(line)) problems.push(`${needle} (line ${line}) reported as uncovered`);
  }

  if (problems.length) {
    console.error(
      `\nSelf-check failed, numbers below are not trustworthy:\n  ${problems.join('\n  ')}`,
    );
    process.exitCode = 1;
  }
}

const ranges = [];
for (const n of uncovered) {
  const last = ranges.at(-1);
  if (last && n === last[1] + 1) last[1] = n;
  else ranges.push([n, n]);
}

/**
 * Everything the suite provably cannot reach, keyed by the first line of the range. These are not
 * gaps in the tests: each one is either dead in any browser, or dead given how the widget is
 * wired. Anything uncovered that is missing from this map is reported as a real gap.
 */
const UNREACHABLE = {
  629: 'window.onclick compares against a node inside the shadow root, and the event target is always retargeted to the host',
  708: "String.split() never yields an undefined first element, so the 'hash' break is dead",
  750: 'setControlCookie() is only ever called with the hash or keepalive scope',
  868: 'init() tests isUserAuthenticated() before the asynchronous subscribe can set sessionData',
  895: 'receiveMessage() matches the origin host including its port against bare domain names',
  902: 'window.attachEvent is an Internet Explorer fallback',
  1360: 'the widget only runs on post.ch hosts, where the other branch is taken',
  1410: 'subscribe() is only re-entered with an address by the dead iframe sync path',
  1463: 'same as 868: no session exists yet when init() runs',
  1500: 'closeDropdowns() inspects a retargeted event target, so the guard never matches',
  1538: 'the menu toggler has no sibling elements to move focus to',
  1551: 'the menu toggler has no sibling elements to move focus to',
  1583: 'the first menu item is the name block, which holds no anchor to fall back to',
};

/** Attribute each uncovered range to the function it sits in, via the nearest declaration above. */
const owner = line => {
  for (let i = line - 1; i >= 0; i--) {
    const m = src[i].match(/function\s+([A-Za-z0-9_$]+)\s*\(/);
    if (m) return m[1];
  }
  return '(top level)';
};

const pct = ((covered.size / seen.size) * 100).toFixed(1);

console.log(`\n${TARGET}`);
console.log(`  ${src.length} physical lines, ${seen.size} executable`);
console.log(`  covered   ${covered.size}/${seen.size}  (${pct}%)`);
console.log(`  uncovered ${uncovered.length} lines in ${ranges.length} ranges\n`);

const byFunction = new Map();
for (const [from, to] of ranges) {
  const fn = owner(from);
  byFunction.set(fn, (byFunction.get(fn) ?? 0) + (to - from + 1));
}

console.log('  uncovered lines by function:');
for (const [fn, n] of [...byFunction].sort((a, b) => b[1] - a[1])) {
  console.log(`    ${String(n).padStart(4)}  ${fn}`);
}

console.log('\n  uncovered ranges:');
for (const [from, to] of ranges) {
  const span = from === to ? `${from}` : `${from}-${to}`;
  const why = UNREACHABLE[from];
  console.log(`    ${span.padEnd(12)} ${(src[from - 1] ?? '').trim().slice(0, 96)}`);
  if (why) console.log(`    ${''.padEnd(12)} ^ ${why}`);
}

const unexplained = ranges.filter(([from]) => !UNREACHABLE[from]);
if (unexplained.length) {
  console.log('\n  uncovered but reachable, these want a test:');
  for (const [from, to] of unexplained) {
    console.log(`    ${(from === to ? `${from}` : `${from}-${to}`).padEnd(12)}`);
  }
  process.exitCode = 1;
}

verify();

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  join(OUT_DIR, 'uncovered.json'),
  JSON.stringify({ total: seen.size, covered: covered.size, ranges }, null, 2),
);
