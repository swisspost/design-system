import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToReact } from './transform-to-react.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsPath = path.resolve(__dirname, '../output/markup-map.json');

const pagePath = path.resolve(__dirname, '../../../apps/integration-next/src/app/ssr/page.tsx');
const layoutPath = path.resolve(__dirname, '../../../apps/integration-next/src/app/ssr/layout.tsx');

const LAYOUT_COMPONENTS = new Set(['Header', 'Footer', 'BackToTop', 'Breadcrumbs']);

// ─── LAYOUT.TSX ───────────────────────────────────────────────────────────────

const layoutTemplate = `export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {/* COMPONENT:Header */}
      <main style={{ paddingBlock: '3rem' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* COMPONENT:Breadcrumbs */}
          {children}
        </div>
      </main>
      {/* COMPONENT:Footer */}
      {/* COMPONENT:BackToTop */}
    </>
  );
}`;

// Create markup-map.json if it doesn't exist
fs.mkdirSync(path.dirname(componentsPath), { recursive: true });
if (!fs.existsSync(componentsPath)) {
  fs.writeFileSync(componentsPath, '{}', 'utf8');
}

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf8'));

if (Object.keys(components).length === 0) {
  throw new Error('⚠️ No components found in markup-map.json — run Cypress tests first');
}

function getHtml(entry) {
  return typeof entry === 'string' ? entry : entry.html;
}

function collectImports(entries) {
  const allImports = new Set();
  for (const entry of entries) {
    const html = getHtml(entry);
    for (const [, tag] of html.matchAll(/<(post-[a-z-]+)/g)) {
      const pascal =
        'Post' +
        tag
          .replace(/^post-/, '')
          .split('-')
          .map(p => p.charAt(0).toUpperCase() + p.slice(1))
          .join('');
      allImports.add(pascal);
    }
  }
  return allImports;
}

// ─── PAGE.TSX ─────────────────────────────────────────────────────────────────

const pageImports = collectImports(
  Object.entries(components)
    .filter(([name]) => !LAYOUT_COMPONENTS.has(name))
    .map(([, entry]) => entry),
);

const rendered = Object.entries(components)
  .filter(([name]) => !LAYOUT_COMPONENTS.has(name))
  .map(([name, entry]) => {
    const html = getHtml(entry);
    const title = typeof entry === 'string' ? name : entry.title;
    const heading = title ? `  <h2>${title}</h2>\n` : '';
    return `${heading}  ${transformToReact(html)}`;
  })
  .join('\n\n');

const homepage = `import { ${[...pageImports].sort((a, b) => a.localeCompare(b)).join(', ')} } from '@swisspost/design-system-components-react/server';
import { PostIconExplosives, PostIconLetter, PostIconLetterSolid } from '@swisspost/design-system-components-react/icons';

export default function Home() {
  return (
    <>
      <h1>Design System Components</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea debitis ex rem minus! Ut
        mollitia deserunt iure impedit. Enim, officia. Fugiat, cupiditate repellat? Excepturi est
        iusto suscipit, omnis iste laboriosam!
      </p>
${rendered}
      <h2>React Server Icons</h2>
      <div className="d-flex gap-16 flex-wrap">
        <figure>
          <PostIconLetter className="fs-2"></PostIconLetter>
          <figcaption>Line Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetterSolid className="fs-2"></PostIconLetterSolid>
          <figcaption>Solid Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetter style={{ color: 'red' }} className="fs-2"></PostIconLetter>
          <figcaption>Colored Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-3"></PostIconLetter>
          <figcaption>Sized Icon</figcaption>
        </figure>
        <figure>
          <PostIconExplosives flipH={true} className="fs-2"></PostIconExplosives>
          <figcaption>Flipped Horizontally</figcaption>
        </figure>
        <figure>
          <PostIconExplosives className="fs-2" flipV={true}></PostIconExplosives>
          <figcaption>Flipped Vertically</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" rotate={90}></PostIconLetter>
          <figcaption>Rotated</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" scale={1.5}></PostIconLetter>
          <figcaption>Scaled</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" animation={'spin'}></PostIconLetter>
          <figcaption>Spinning</figcaption>
        </figure>
      </div>
    </>
  );
}
`;

fs.mkdirSync(path.dirname(pagePath), { recursive: true });
fs.writeFileSync(pagePath, homepage, 'utf8');
console.log(`✅ page.tsx written → ${pagePath}`);

// ─── LAYOUT.TSX ───────────────────────────────────────────────────────────────

const usedNames = [...layoutTemplate.matchAll(/\{\/\* COMPONENT:(\w+) \*\/\}/g)].map(
  ([, name]) => name,
);
const layoutImports = collectImports(usedNames.map(name => components[name]).filter(Boolean));

let result = layoutTemplate.replaceAll(/\{\/\* COMPONENT:(\w+) \*\/\}/g, (_, name) => {
  const entry = components[name];
  if (!entry) return `{/* WARNING: ${name} not found in markup-map.json */}`;
  return transformToReact(getHtml(entry));
});

result = result
  .replace(/^import type React from 'react';\n?/m, '')
  .replace(/^import \{[^}]*\} from '@swisspost\/design-system-components-react\/server';\n?/m, '');

result = `import { ${[...layoutImports].sort((a, b) => a.localeCompare(b)).join(', ')} } from '@swisspost/design-system-components-react/server';\n\n${result}`;
result = result.replaceAll(/^[\t ]*\r?\n/gm, '');

fs.mkdirSync(path.dirname(layoutPath), { recursive: true });
fs.writeFileSync(layoutPath, result, 'utf8');
console.log(`✅ layout.tsx written → ${layoutPath}`);
