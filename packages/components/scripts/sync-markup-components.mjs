/**
 * Reads all non-snapshot *.stories.ts files under apps/documentation/src/stories/components/,
 * extracts meta.id, meta.component (post-* only), and story export names,
 * then writes cypress/fixtures/markup-components.ts with the COMPONENTS array.
 *
 * Run: node scripts/sync-markup-components.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storiesRoot = path.resolve(__dirname, '../../../apps/documentation/src/stories/components');
const outputPath = path.resolve(__dirname, '../cypress/fixtures/markup-components.ts');

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/** PascalCase / camelCase → Storybook kebab-case (mirrors lodash startCase → kebab) */
function toKebab(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Za-z])/g, '$1-$2')
    .toLowerCase();
}

/** Recursively collect files matching a predicate */
function walk(dir, predicate, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, results);
    else if (predicate(entry.name)) results.push(full);
  }
  return results;
}

// ─── COLLECT STORY FILES ──────────────────────────────────────────────────────

const storyFiles = walk(
  storiesRoot,
  name => name.endsWith('.stories.ts') && !name.includes('.snapshot.'),
);

// ─── PARSE EACH FILE ──────────────────────────────────────────────────────────

const components = [];

for (const file of storyFiles) {
  const src = fs.readFileSync(file, 'utf8');

  const idMatch = src.match(/\bid:\s*['"]([0-9a-f-]{36})['"]/);
  const componentMatch = src.match(/\bcomponent:\s*'(post-[a-z-]+)'/);

  const id = idMatch?.[1];
  const component = componentMatch?.[1];

  if (!id || !component) continue;

  // Extract named story exports: export const Foo: Story... or export const Foo: StoryObj...
  const storyExports = [...src.matchAll(/^export const (\w+)\s*:\s*Story/gm)].map(m => m[1]);

  if (storyExports.length === 0) continue;

  components.push({
    id,
    stories: storyExports.map(toKebab),
    tags: [component],
  });
}

// Sort by component tag for stable output
components.sort((a, b) => a.tags[0].localeCompare(b.tags[0]));

// ─── WRITE FIXTURE ────────────────────────────────────────────────────────────

const lines = components.map(({ id, stories, tags }) => {
  const storiesStr = stories.map(s => `'${s}'`).join(', ');
  const tagsStr = tags.map(t => `'${t}'`).join(', ');
  return `  { id: '${id}', stories: [${storiesStr}], tags: [${tagsStr}] },`;
});

const output = `// AUTO-GENERATED — do not edit manually.
// Regenerate with: node scripts/sync-markup-components.mjs

export type TagEntry = string | { tag: string; options?: { title?: string; noTitle?: boolean } };

export const COMPONENTS: Array<{ id: string; stories: string[]; tags: TagEntry[] }> = [
${lines.join('\n')}
];
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, 'utf8');
console.log(`✅ Written ${components.length} components → ${outputPath}`);
