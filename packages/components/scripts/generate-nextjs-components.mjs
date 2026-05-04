import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToReact } from './transform-to-react.mjs';
import {
  LAYOUT_COMPONENTS,
  loadMarkupMap,
  getHtml,
  getVariants,
  collectImports,
} from './utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ssrDir = path.resolve(__dirname, '../../../apps/integration-next/src/app/ssr');
const pagePath = path.resolve(ssrDir, '(default)/page.tsx');
const defaultLayoutPath = path.resolve(ssrDir, '(default)/layout.tsx');
const layoutPath = path.resolve(ssrDir, 'layout.tsx');

const components = loadMarkupMap();

// ─── LAYOUT.TSX ───────────────────────────────────────────────────────────────

const headerEntry = components['Header'];
const headerVariants = headerEntry?.variants
  ? Object.entries(headerEntry.variants).filter(([name]) => name !== 'default')
  : [];

const headerVariantRoutes = headerVariants
  .map(([n]) => `{ label: 'Header: ${n}', href: '/ssr/header-${n}' }`)
  .join(',\n    ');

const navLinks = `[
    { label: 'Home', href: '/ssr' },
    ${headerVariantRoutes}
  ]`;

const layoutTemplate = `export default function Layout({ children }: { readonly children: React.ReactNode }) {
  const routes = ${navLinks};
  return (
    <>
      {/* COMPONENT:Header */}
      <nav className="palette palette-alternate" style={{ padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {routes.map(r => (
            <a key={r.href} href={r.href} style={{ fontWeight: 'bold' }}>{r.label}</a>
          ))}
        </div>
      </nav>
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

// ─── PAGE.TSX ─────────────────────────────────────────────────────────────────

const pageImports = collectImports(
  Object.entries(components)
    .filter(([name]) => !LAYOUT_COMPONENTS.has(name))
    .map(([, entry]) => entry),
);

const rendered = Object.entries(components)
  .filter(([name]) => !LAYOUT_COMPONENTS.has(name))
  .map(([name, entry]) => {
    const title = typeof entry === 'string' ? name : entry.title;
    const heading = title ? `  <h2>${title}</h2>\n` : '';
    const variants = getVariants(entry);
    const variantHtml = variants
      .map(({ story, html }) => {
        const storyHeading = variants.length > 1 ? `  <h3>${story}</h3>\n` : '';
        return `${storyHeading}  ${transformToReact(html)}`;
      })
      .join('\n\n');
    return `${heading}${variantHtml}`;
  })
  .join('\n\n');

const homepage = `import { ${pageImports.join(', ')} } from '@swisspost/design-system-components-react/server';
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

// ─── LAYOUT BUILDER ───────────────────────────────────────────────────────────

/**
 * Strip the Storybook story scaffold wrapper (header-story-wrapper + virtual-body)
 * from a raw HTML string, returning only the inner content.
 * This prevents demo scaffolding from leaking into layout output.
 */
function stripStoryScaffold(html) {
  const match = /(<div\s[^>]*class="[^"]*virtual-body[^"]*"[^>]*>)/i.exec(html);
  if (!match) return html;
  const start = match.index + match[0].length;
  let depth = 1;
  let i = start;
  while (i < html.length && depth > 0) {
    const openDiv = html.indexOf('<div', i);
    const closeDiv = html.indexOf('</div>', i);
    if (closeDiv === -1) break;
    if (openDiv !== -1 && openDiv < closeDiv) {
      depth++;
      i = openDiv + 4;
    } else {
      depth--;
      if (depth === 0) return html.slice(start, closeDiv).trim();
      i = closeDiv + 6;
    }
  }
  return html.slice(start).trim();
}

/** Builds a full layout.tsx, using provided raw headerHtml for the Header slot. */
function buildLayoutTsx(headerHtml) {
  let content = layoutTemplate.replaceAll(/\{\/\* COMPONENT:(\w+) \*\/\}/g, (_, name) => {
    if (name === 'Header') {
      return headerHtml
        ? transformToReact(headerHtml)
        : `{/* WARNING: Header not found in markup-map.json */}`;
    }
    const entry = components[name];
    if (!entry) return `{/* WARNING: ${name} not found in markup-map.json */}`;
    // Only BackToTop has a story scaffold with a demo header inside — strip it
    const rawHtml = name === 'BackToTop' ? stripStoryScaffold(getHtml(entry)) : getHtml(entry);
    return transformToReact(rawHtml);
  });

  const imports = [
    ...new Set([...content.matchAll(/<(Post[A-Z][A-Za-z]+)/g)].map(([, t]) => t)),
  ].sort((a, b) => a.localeCompare(b));

  content = content
    .replace(/^import type React from 'react';\n?/m, '')
    .replace(
      /^import \{[^}]*\} from '@swisspost\/design-system-components-react\/server';\n?/m,
      '',
    );

  if (imports.length > 0) {
    content = `import { ${imports.join(', ')} } from '@swisspost/design-system-components-react/server';\n\n${content}`;
  }

  return content.replaceAll(/^[\t ]*\r?\n/gm, '');
}

// ─── HEADER VARIANT LAYOUTS ───────────────────────────────────────────────────
// (headerEntry and headerVariants are declared at the top of this file)

for (const [variantName, variantHtml] of headerVariants) {
  const variantDir = path.join(ssrDir, `header-${variantName}`);
  fs.mkdirSync(variantDir, { recursive: true });

  // layout.tsx — full shell with variant header + footer/breadcrumbs/backtotop
  fs.writeFileSync(path.join(variantDir, 'layout.tsx'), buildLayoutTsx(variantHtml), 'utf8');
  console.log(`✅ header-${variantName}/layout.tsx written`);

  // page.tsx — simple placeholder
  const fnName =
    'Header' +
    variantName
      .split('-')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join('');
  fs.writeFileSync(
    path.join(variantDir, 'page.tsx'),
    `export default function ${fnName}Page() {\n  return <h1>Header: ${variantName}</h1>;\n}\n`,
    'utf8',
  );
  console.log(`✅ header-${variantName}/page.tsx written`);
}

// ─── DEFAULT LAYOUT.TSX ─────────────────────────────────────────────────────

// Delete old ssr/page.tsx if it still exists (moved to (default)/page.tsx)
const legacyPagePath = path.resolve(ssrDir, 'page.tsx');
if (fs.existsSync(legacyPagePath)) {
  fs.rmSync(legacyPagePath);
  console.log(`🗑 ssr/page.tsx removed (moved to (default)/page.tsx)`);
}

// (default)/layout.tsx — default header full shell
const defaultLayout = buildLayoutTsx(getHtml(components['Header']));
fs.mkdirSync(path.dirname(defaultLayoutPath), { recursive: true });
fs.writeFileSync(defaultLayoutPath, defaultLayout, 'utf8');
console.log(`✅ (default)/layout.tsx written`);

// ssr/layout.tsx — pass-through: prevents root layout from wrapping variant layouts
const passThrough = `export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>;
}
`;
fs.mkdirSync(path.dirname(layoutPath), { recursive: true });
fs.writeFileSync(layoutPath, passThrough, 'utf8');
console.log(`✅ layout.tsx (pass-through) written → ${layoutPath}`);
