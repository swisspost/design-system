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

/** Every module the widget is being split into, so a move between them cannot hide a gap. */
const TARGETS = [
  'src/legacy/control-cookie.js',
  'src/legacy/klp-login-widget.js',
  'src/legacy/texts.js',
  'src/legacy/urls.js',
  'src/legacy/storage.js',
  'src/legacy/session-client.js',
  'src/legacy/message-router.js',
  'src/legacy/dropdown.js',
  'src/legacy/markup.js',
  'src/legacy/change-account-dialog.js',
  'src/legacy/keep-alive.js',
  'src/legacy/event-bus-connection.js',
  'src/legacy/notifications.js',
  'src/legacy/view.js',
  'src/legacy/vertx-eventbus.js',
  'src/legacy/sockjs-websocket.js',
];

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

const covered = new Map(TARGETS.map(t => [t, new Set()]));
const seen = new Map(TARGETS.map(t => [t, new Set()]));

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
    if (m.originalLine == null || !m.source) return;

    const source = m.source.replace(/\\/g, '/');
    const target = TARGETS.find(t => source.endsWith(t));
    if (!target) return;

    const offset = lineStarts[m.generatedLine - 1] + m.generatedColumn;
    const count = bundle.counts[offset];
    if (count === undefined || count < 0) return;

    seen.get(target).add(m.originalLine);
    if (count > 0) covered.get(target).add(m.originalLine);
  });
}

for (const target of TARGETS) {
  if (!seen.get(target).size) {
    console.error(`No mappings found for ${target}.`);
    process.exit(1);
  }
}

/**
 * Everything the suite provably cannot reach, keyed by file and by `owning function: source of
 * the first line`. These are not gaps in the tests: each one is either dead in any browser, or
 * dead given how the widget is wired. Anything uncovered that is missing from here is reported as
 * a real gap. The key deliberately avoids line numbers, so moving code between modules does not
 * silently re-arm the whole list.
 */
const UNREACHABLE = {
  'src/legacy/control-cookie.js': {
    'setControlCookie: document.cookie =':
      'setControlCookie() is only ever called with the hash or keepalive scope',
  },
  'src/legacy/klp-login-widget.js': {
    "receiveMessage: log('PostMessage syncWidget received');":
      'receiveMessage() matches the origin host including its port against bare domain names',
    'trySubscription: return true;':
      'the widget only runs on post.ch hosts, where the other branch is taken',
    "subscribe: log('Address available, skipping subscription');":
      'subscribe() is only re-entered with an address by the dead iframe sync path',
  },
  'src/legacy/keep-alive.js': {},
  'src/legacy/event-bus-connection.js': {},
  'src/legacy/notifications.js': {},
  'src/legacy/view.js': {},
  'src/legacy/texts.js': {},
  'src/legacy/urls.js': {},
  'src/legacy/storage.js': {},
  'src/legacy/session-client.js': {},
  'src/legacy/message-router.js': {},
  'src/legacy/dropdown.js': {
    'closeDropdowns: return;':
      'closeDropdowns() inspects a retargeted event target, so the guard never matches',
    "setArrowKeysListeners: parent.prev().find('a').focus();":
      'the menu toggler has no sibling elements to move focus to',
    "setArrowKeysListeners: parent.next().find('a').focus();":
      'the menu toggler has no sibling elements to move focus to',
    'setArrowKeysListeners: dropdownToggler.click().focus();':
      'the first menu item is the name block, which holds no anchor to fall back to',
  },
  'src/legacy/markup.js': {},
  'src/legacy/change-account-dialog.js': {
    'changeAccountDialog: modal.parentElement.removeChild(modal);':
      'window.onclick compares against a node inside the shadow root, and the event target is always retargeted to the host',
  },
  'src/legacy/vertx-eventbus.js': {},
};

/**
 * Ground truth in both directions. The first list can only run in code paths no browser reaches:
 * the IE branch, and an init-time keepalive that tests `sessionData` before the asynchronous
 * subscribe has had a chance to set it. The second list is covered by the very first smoke test,
 * so seeing it uncovered means the mapping broke rather than the suite regressing.
 */
const CANARIES = {
  'src/legacy/klp-login-widget.js': {
    uncovered: ["window.attachEvent('onmessage'"],
    covered: ['const version =', 'function renderWidget()'],
  },
  'src/legacy/vertx-eventbus.js': {
    uncovered: [],
    covered: ['that.registerHandler = function'],
  },
  'src/legacy/texts.js': {
    uncovered: [],
    covered: ["'change-account': 'Benutzerkonto wechseln'"],
  },
  'src/legacy/urls.js': {
    uncovered: [],
    covered: ['export function buildLoginParameters'],
  },
  'src/legacy/control-cookie.js': {
    uncovered: [],
    covered: ['export function hash'],
  },
  'src/legacy/storage.js': {
    uncovered: [],
    covered: ['function isHTML5StorageSupported'],
  },
  'src/legacy/session-client.js': {
    uncovered: [],
    covered: ['export function buildEndPoints'],
  },
  'src/legacy/message-router.js': {
    uncovered: [],
    covered: ["case 'sub':"],
  },
  'src/legacy/dropdown.js': {
    uncovered: [],
    covered: ['export function createDropdown'],
  },
  'src/legacy/markup.js': {
    uncovered: [],
    covered: ['export function anonymousWidget'],
  },
  'src/legacy/change-account-dialog.js': {
    uncovered: [],
    covered: ['function setChangeAccountDialog'],
  },
  'src/legacy/keep-alive.js': {
    uncovered: ['Running keepAliveSessionsOnInit'],
    covered: ['function keepAliveTimerFunction'],
  },
  'src/legacy/event-bus-connection.js': {
    uncovered: [],
    covered: ['function openCommunication'],
  },
  'src/legacy/notifications.js': {
    uncovered: [],
    covered: ['function toggleNotificationsMenu'],
  },
  'src/legacy/view.js': {
    uncovered: [],
    covered: ['function renderWidget'],
  },
};

/** Attribute an uncovered range to the function it sits in, via the nearest declaration above. */
const owner = (src, line) => {
  for (let i = line - 1; i >= 0; i--) {
    const m = src[i].match(/(?:function\s+([A-Za-z0-9_$]+)|that\.([A-Za-z0-9_$]+)\s*=\s*function)/);
    if (m) return m[1] ?? m[2];
  }
  return '(top level)';
};

/** The key an UNREACHABLE entry has to carry to explain away the range starting at this line. */
const reasonKey = (src, line) => `${owner(src, line)}: ${(src[line - 1] ?? '').trim()}`;

const summary = {};
const htmlData = [];
const uncoveredBlocks = [];
let uncoveredLineCount = 0;
let totalSeen = 0;
let totalCovered = 0;

for (const target of TARGETS) {
  const src = readFileSync(join(ROOT, target), 'utf8').split('\n');
  const hit = covered.get(target);
  const all = seen.get(target);
  const uncovered = [...all].filter(n => !hit.has(n)).sort((a, b) => a - b);
  const unreachable = UNREACHABLE[target] ?? {};

  const ranges = [];
  for (const n of uncovered) {
    const last = ranges.at(-1);
    if (last && n === last[1] + 1) last[1] = n;
    else ranges.push([n, n]);
  }

  totalSeen += all.size;
  totalCovered += hit.size;
  summary[target] = { total: all.size, covered: hit.size, ranges };

  const noteByLine = {};
  for (const [from, to] of ranges) {
    const why = unreachable[reasonKey(src, from)];
    if (why) noteByLine[from] = why;
    uncoveredLineCount += to - from + 1;
    // One row per contiguous range, so a multi-line gap carries its explanation once.
    uncoveredBlocks.push({
      file: target,
      from,
      to,
      code: src.slice(from - 1, to).join('\n'),
      explanation: why ?? '',
    });
  }
  htmlData.push({
    target,
    src,
    seen: all,
    hit,
    noteByLine,
    total: all.size,
    covered: hit.size,
    pct: (hit.size / all.size) * 100,
  });

  const pct = ((hit.size / all.size) * 100).toFixed(1);
  console.log(`\n${target}`);
  console.log(`  ${src.length} physical lines, ${all.size} executable`);
  console.log(`  covered   ${hit.size}/${all.size}  (${pct}%)`);
  console.log(`  uncovered ${uncovered.length} lines in ${ranges.length} ranges`);

  if (ranges.length) {
    const byFunction = new Map();
    for (const [from, to] of ranges) {
      const fn = owner(src, from);
      byFunction.set(fn, (byFunction.get(fn) ?? 0) + (to - from + 1));
    }

    console.log('\n  uncovered lines by function:');
    for (const [fn, n] of [...byFunction].sort((a, b) => b[1] - a[1])) {
      console.log(`    ${String(n).padStart(4)}  ${fn}`);
    }

    console.log('\n  uncovered ranges:');
    for (const [from, to] of ranges) {
      const span = from === to ? `${from}` : `${from}-${to}`;
      const why = unreachable[reasonKey(src, from)];
      console.log(`    ${span.padEnd(12)} ${(src[from - 1] ?? '').trim().slice(0, 96)}`);
      if (why) console.log(`    ${''.padEnd(12)} ^ ${why}`);
    }
  }

  const unexplained = ranges.filter(([from]) => !unreachable[reasonKey(src, from)]);
  if (unexplained.length) {
    console.log('\n  uncovered but reachable, these want a test:');
    for (const [from, to] of unexplained) {
      console.log(`    ${from === to ? from : `${from}-${to}`}  ${reasonKey(src, from)}`);
    }
    process.exitCode = 1;
  }

  const problems = [];
  const canaries = CANARIES[target] ?? { uncovered: [], covered: [] };

  for (const needle of canaries.uncovered) {
    const line = src.findIndex(l => l.includes(needle)) + 1;
    if (line && hit.has(line)) problems.push(`${needle} (line ${line}) reported as covered`);
  }

  for (const needle of canaries.covered) {
    const line = src.findIndex(l => l.includes(needle)) + 1;
    if (line && !hit.has(line)) problems.push(`${needle} (line ${line}) reported as uncovered`);
  }

  if (problems.length) {
    console.error(
      `\n  Self-check failed, numbers above are not trustworthy:\n    ${problems.join('\n    ')}`,
    );
    process.exitCode = 1;
  }
}

const totalPct = ((totalCovered / totalSeen) * 100).toFixed(1);
console.log(`\ntotal  ${totalCovered}/${totalSeen}  (${totalPct}%)\n`);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  join(OUT_DIR, 'uncovered.json'),
  JSON.stringify({ total: totalSeen, covered: totalCovered, files: summary }, null, 2),
);

const htmlPath = writeHtmlReport();
console.log(`html report  ${htmlPath}\n`);

/** A single self-contained page: a summary table, each source coloured line by line, and a
 * final table of the combined uncovered code blocks. Written unminified so it reads well in an
 * editor too. */
function writeHtmlReport() {
  const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const id = target => target.replace(/[^a-z0-9]+/gi, '-');
  const pct = f => f.pct.toFixed(1);

  const summaryRows = htmlData.map(
    f =>
      `        <tr>\n` +
      `          <td><a href="#${id(f.target)}">${esc(f.target)}</a></td>\n` +
      `          <td class="num">${f.covered}/${f.total}</td>\n` +
      `          <td class="num">${pct(f)}%</td>\n` +
      `          <td><span class="bar"><span style="width:${pct(f)}%"></span></span></td>\n` +
      `        </tr>`,
  );

  const sections = htmlData.map(f => {
    const lines = f.src.flatMap((text, i) => {
      const ln = i + 1;
      let cls = 'nex';
      if (f.hit.has(ln)) cls = 'cov';
      else if (f.seen.has(ln)) cls = 'unc';
      const row =
        `          <div class="line ${cls}">` +
        `<span class="ln">${ln}</span><span class="src">${esc(text) || ' '}</span></div>`;
      if (!f.noteByLine[ln]) return [row];
      const note =
        `          <div class="line note">` +
        `<span class="ln"></span><span class="src">\u2191 ${esc(f.noteByLine[ln])}</span></div>`;
      return [row, note];
    });
    return (
      `      <details id="${id(f.target)}">\n` +
      `        <summary>\n` +
      `          <span class="fname">${esc(f.target)}</span>\n` +
      `          <span class="num">${f.covered}/${f.total} (${pct(f)}%)</span>\n` +
      `          <span class="bar"><span style="width:${pct(f)}%"></span></span>\n` +
      `        </summary>\n` +
      `        <div class="code">\n${lines.join('\n')}\n        </div>\n` +
      `      </details>`
    );
  });

  const uncoveredRows = uncoveredBlocks.map(u => {
    const span = u.from === u.to ? `${u.from}` : `${u.from}\u2013${u.to}`;
    return (
      `        <tr>\n` +
      `          <td class="num"><a href="#${id(u.file)}">${esc(u.file)}</a>:${span}</td>\n` +
      `          <td><code>${esc(u.code) || ' '}</code></td>\n` +
      `          <td>${u.explanation ? esc(u.explanation) : '<span class="muted">reachable \u2014 wants a test</span>'}</td>\n` +
      `        </tr>`
    );
  });

  const css = [
    ':root{--g:#e6f4ea;--gb:#34a853;--r:#fce8e6;--rb:#ea4335;--muted:#9aa0a6}',
    '*{box-sizing:border-box}',
    'body{font:14px/1.5 system-ui,sans-serif;margin:0;color:#202124}',
    'header{background:#202124;color:#fff;padding:1.25rem 1.5rem}',
    'header h1{margin:0;font-size:1rem;font-weight:600}',
    '.total{font-size:2.25rem;font-weight:700;line-height:1.1}',
    '.wrap{max-width:1100px;margin:0 auto;padding:1.5rem}',
    'h2{font-size:1rem;margin:2.5rem 0 1rem}',
    '.legend{display:flex;gap:1rem;margin:.5rem 0 1.5rem;color:var(--muted);font-size:12px}',
    '.legend span{display:inline-flex;align-items:center;gap:.35rem}',
    '.sw{width:12px;height:12px;border-radius:3px;display:inline-block}',
    'table{width:100%;border-collapse:collapse;margin-bottom:2rem}',
    'th,td{text-align:left;padding:.4rem .6rem;border-bottom:1px solid #eee;vertical-align:top}',
    'th{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.03em}',
    '.num{font-variant-numeric:tabular-nums;white-space:nowrap}',
    '.bar{position:relative;display:block;height:12px;min-width:120px;background:var(--r);border-radius:6px;overflow:hidden}',
    '.bar>span{position:absolute;inset:0 auto 0 0;background:var(--gb)}',
    'details{border:1px solid #eee;border-radius:8px;margin-bottom:.75rem;overflow:hidden}',
    'summary{cursor:pointer;padding:.55rem .8rem;display:flex;gap:1rem;align-items:center}',
    'summary .fname{font-weight:600;flex:1}',
    'details[open] summary{border-bottom:1px solid #eee}',
    '.code{overflow:auto;max-height:70vh}',
    '.line{display:flex;font:12px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre}',
    '.line .ln{flex:none;width:3.5rem;text-align:right;padding:0 .75rem;color:var(--muted);user-select:none}',
    '.line .src{flex:1;padding-right:1rem}',
    '.line.cov{background:var(--g)}',
    '.line.unc{background:var(--r)}',
    '.line.note .src{color:#8a5a00;font-style:italic}',
    'table.uncovered code{font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap}',
    '.muted{color:var(--muted)}',
    'a{color:#1a73e8;text-decoration:none}',
    'a:hover{text-decoration:underline}',
  ].map(rule => `      ${rule}`);

  const totalPctStr = ((totalCovered / totalSeen) * 100).toFixed(1);
  const html = [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>KLP legacy widget coverage</title>',
    '  <style>',
    ...css,
    '  </style>',
    '</head>',
    '<body>',
    '  <header>',
    '    <h1>KLP legacy widget \u2014 line coverage</h1>',
    `    <div class="total">${totalPctStr}%</div>`,
    `    <div>${totalCovered} / ${totalSeen} executable lines</div>`,
    '  </header>',
    '  <div class="wrap">',
    '    <div class="legend">',
    '      <span><i class="sw" style="background:var(--gb)"></i>covered</span>',
    '      <span><i class="sw" style="background:var(--rb)"></i>uncovered</span>',
    '      <span><i class="sw" style="background:#eee"></i>non-executable</span>',
    '      <span>italic note = known unreachable</span>',
    '    </div>',
    '    <table>',
    '      <thead><tr><th>File</th><th>Lines</th><th>Coverage</th><th></th></tr></thead>',
    '      <tbody>',
    ...summaryRows,
    '      </tbody>',
    '    </table>',
    ...sections,
    `    <h2>Uncovered code blocks (${uncoveredBlocks.length}, ${uncoveredLineCount} lines)</h2>`,
    '    <table class="uncovered">',
    '      <thead><tr><th>File</th><th>Code</th><th>Explanation</th></tr></thead>',
    '      <tbody>',
    ...uncoveredRows,
    '      </tbody>',
    '    </table>',
    '  </div>',
    '</body>',
    '</html>',
    '',
  ].join('\n');

  const out = join(OUT_DIR, 'index.html');
  writeFileSync(out, html);
  return out;
}
