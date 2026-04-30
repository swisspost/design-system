import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── PROP TYPES ───────────────────────────────────────────────────────────────

export const propTypes = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../output/prop-types.json'), 'utf8'),
);

// ─── MARKUP MAP ───────────────────────────────────────────────────────────────

export const LAYOUT_COMPONENTS = new Set(['Header', 'Footer', 'BackToTop', 'Breadcrumbs']);

/**
 * Ensures markup-map.json exists, reads it, and throws if it is empty.
 */
export function loadMarkupMap() {
  const markupMapPath = path.resolve(__dirname, '../output/markup-map.json');
  fs.mkdirSync(path.dirname(markupMapPath), { recursive: true });
  if (!fs.existsSync(markupMapPath)) {
    fs.writeFileSync(markupMapPath, '{}', 'utf8');
    console.log(`✅ Created ${markupMapPath}`);
  }
  const components = JSON.parse(fs.readFileSync(markupMapPath, 'utf8'));
  if (Object.keys(components).length === 0) {
    throw new Error('⚠️ No components found in markup-map.json — run Cypress tests first');
  }
  return components;
}

/** Extracts raw HTML from a markup-map entry. Supports legacy { html } and new { variants } shapes. */
export function getHtml(entry, story = 'default') {
  if (typeof entry === 'string') return entry;
  if (entry.variants) return entry.variants[story] ?? Object.values(entry.variants)[0];
  return entry.html;
}

/** Returns all variants as [{ story, html }]. Falls back to a single 'default' entry for legacy shapes. */
export function getVariants(entry) {
  if (typeof entry === 'string') return [{ story: 'default', html: entry }];
  if (entry.variants) return Object.entries(entry.variants).map(([story, html]) => ({ story, html }));
  return [{ story: 'default', html: entry.html }];
}

/**
 * Scans markup entries for post-* tags and returns sorted PascalCase component names.
 * @param {Array} entries - Array of markup-map entry values.
 */
export function collectImports(entries) {
  const allImports = new Set();
  for (const entry of entries) {
    for (const { html } of getVariants(entry)) {
      for (const [, tag] of html.matchAll(/<(post-[a-z-]+)/g)) {
        allImports.add(
          'Post' +
            tag
              .replace(/^post-/, '')
              .split('-')
              .map(p => p.charAt(0).toUpperCase() + p.slice(1))
              .join(''),
        );
      }
    }
  }
  return [...allImports].sort((a, b) => a.localeCompare(b));
}

// ─── HTML TRANSFORMS ──────────────────────────────────────────────────────────

export function removeHtmlComments(input) {
  let sanitized;
  do {
    sanitized = input;
    input = input.replaceAll(/<!--[\s\S]*?-->/g, '');
  } while (input !== sanitized);
  return input;
}

/**
 * Converts a parsed attribute string into a transformed list.
 * @param {string} attrs - Raw attribute string from the regex match.
 * @param {object} componentProps - Prop type map for the component.
 * @param {(name: string, value: string, type: string|undefined, attr: string) => string} formatAttr
 *   Called for each key=value attribute; return the replacement attribute string (without leading space).
 */
export function convertAttributes(attrs, componentProps, formatAttr) {
  let convertedAttrs = '';
  for (const attr of attrs.split(/\s+/).filter(Boolean)) {
    const eqIndex = attr.indexOf('="');
    if (eqIndex === -1) {
      convertedAttrs += ` ${attr}`;
      continue;
    }
    const name = attr.slice(0, eqIndex);
    const value = attr.slice(eqIndex + 2, -1);
    const kebab = name.replaceAll(/([A-Z])/g, c => `-${c.toLowerCase()}`);
    const type = componentProps[kebab] ?? componentProps[name];
    convertedAttrs += ` ${formatAttr(name, value, type, attr)}`;
  }
  return convertedAttrs;
}

export function selfCloseVoidElements(html) {
  return html.replaceAll(
    /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g,
    (_, tag, attrs) => `<${tag}${attrs} />`,
  );
}

export function cleanupHtml(html) {
  return html
    .replaceAll(/\n{3,}/g, '\n\n')
    .replaceAll(/^[\t ]*\r?\n/gm, '')
    .trim();
}
