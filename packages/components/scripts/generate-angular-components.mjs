import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToAngular } from './transform-to-angular.mjs';
import {
  LAYOUT_COMPONENTS,
  loadMarkupMap,
  getHtml,
  getVariants,
  collectImports,
} from './utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = path.resolve(__dirname, '../../components-angular/projects/consumer-app/src/app');
const appTsPath = path.join(basePath, 'app.component.ts');

const components = loadMarkupMap();

// ─── HOME COMPONENT ───────────────────────────────────────────────────────────

// Filter out layout components — home only shows non-layout components
const homeEntries = Object.entries(components).filter(([name]) => !LAYOUT_COMPONENTS.has(name));

const homeHtml =
  homeEntries
    .map(([name, entry]) => {
      const title = typeof entry === 'string' ? name : entry.title;
      const heading = title ? `<h2>${title}</h2>\n` : '';
      const variants = getVariants(entry);
      const variantHtml = variants
        .map(({ story, html }) => {
          const storyHeading = variants.length > 1 ? `  <h3>${story}</h3>\n` : '';
          return `${storyHeading}  ${transformToAngular(html)}`;
        })
        .join('\n\n');
      return `<div class="my-24">\n  ${heading}${variantHtml}\n</div>`;
    })
    .join('\n\n') +
  `

<div class="my-24">
 <h2>Icons</h2>
  <div class="d-flex gap-16 flex-wrap">
    <figure>
      <post-icon name="letter" class="fs-2"></post-icon>
      <figcaption>Line Icon</figcaption>
    </figure>
    <figure>
      <post-icon name="letter-solid" class="fs-2"></post-icon>
      <figcaption>Solid Icon</figcaption>
    </figure>
    <figure>
      <post-icon name="letter" style="color: red" class="fs-2"></post-icon>
      <figcaption>Colored Icon</figcaption>
    </figure>
    <figure>
      <post-icon name="letter" class="fs-3"></post-icon>
      <figcaption>Sized Icon</figcaption>
    </figure>
    <figure>
      <post-icon name="explosives" [flipH]="true" class="fs-2"></post-icon>
      <figcaption>Flipped Horizontally</figcaption>
    </figure>
    <figure>
      <post-icon name="explosives" class="fs-2" [flipV]="true"></post-icon>
      <figcaption>Flipped Vertically</figcaption>
    </figure>
    <figure>
      <post-icon name="letter" class="fs-2" [rotate]="90"></post-icon>
      <figcaption>Rotated</figcaption>
    </figure>
    <figure>
      <post-icon name="letter" class="fs-2" [scale]="1.5"></post-icon>
      <figcaption>Scaled</figcaption>
    </figure>
    <figure>
      <post-icon name="letter" class="fs-2" animation="spin"></post-icon>
      <figcaption>Spinning</figcaption>
    </figure>
  </div>
</div>`;

/**
 * Strip the Storybook story scaffold wrapper (header-story-wrapper + virtual-body)
 * so components like BackToTop don't pull in a demo header in the layout.
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

// Prepend default header to home page — home is a full self-contained page
const defaultHeaderHtml = transformToAngular(getHtml(components['Header']));
const homeFullHtml = `${defaultHeaderHtml}\n\n<main class="container my-16">\n${homeHtml}\n</main>`;

// Collect imports from the full transformed HTML (header + showcase content)
const homeImports = [
  ...new Set(
    [...homeFullHtml.matchAll(/<(post-[a-z-]+)/g)].map(
      ([, tag]) =>
        'Post' +
        tag
          .replace(/^post-/, '')
          .split('-')
          .map(p => p.charAt(0).toUpperCase() + p.slice(1))
          .join(''),
    ),
  ),
].sort((a, b) => a.localeCompare(b));

const homeImportBlock =
  homeImports.length > 0
    ? `\nimport {\n  ${homeImports.join(',\n  ')},\n} from 'components';\n`
    : '';
const homeImportsList = homeImports.length > 0 ? `\n    ${homeImports.join(',\n    ')},` : '';

const homeTs = `import { Component } from '@angular/core';${homeImportBlock}
@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [${homeImportsList}
  ],
})
export class HomeComponent {}
`;

const homePath = path.join(basePath, 'routes/home');
fs.mkdirSync(homePath, { recursive: true });
fs.writeFileSync(path.join(homePath, 'home.component.html'), homeFullHtml, 'utf8');
fs.writeFileSync(path.join(homePath, 'home.component.ts'), homeTs, 'utf8');
console.log(`✅ home.component.html + .ts written`);

// ─── APP COMPONENT ────────────────────────────────────────────────────────────

// Minimal shell — no header/footer; each routed component owns its full layout
const layoutTemplate = `<header class="palette palette-alternate">
  <nav class="container py-12">
    <p class="mb-12"><strong>Component Showcase Routes:</strong></p>
    <ul class="d-flex flex-wrap row-gap-4 column-gap-16 m-0 list-unstyled">
      <li *ngFor="let route of navigationRoutes">
        <a [routerLink]="route.path">{{ route.title }}</a>
      </li>
    </ul>
  </nav>
</header>

<router-outlet></router-outlet>`;

// The minimal template has no COMPONENT placeholders — write it directly
const appHtml = layoutTemplate;

// Update app.component.ts to only use router + CommonModule (no post-* imports)
if (fs.existsSync(appTsPath)) {
  const updated = fs
    .readFileSync(appTsPath, 'utf8')
    .replace(/\nimport \{[^}]+\} from 'components';\n?/, '\n')
    .replace(
      /imports: \[\n([\s\S]*?)\],/,
      'imports: [\n    CommonModule,\n    RouterOutlet,\n    RouterLink,\n  ],',
    );
  fs.writeFileSync(appTsPath, updated, 'utf8');
  console.log(`✅ app.component.ts imports updated`);
} else {
  console.log('⚠️ app.component.ts not found — skipping');
}

// Write generated app HTML
fs.writeFileSync(path.join(basePath, 'app.component.html'), appHtml, 'utf8');
console.log(`✅ app.component.html written`);

// ─── HEADER VARIANT PAGES ─────────────────────────────────────────────────────

const headerEntry = components['Header'];
const headerVariants = headerEntry?.variants
  ? Object.entries(headerEntry.variants).filter(([name]) => name !== 'default')
  : [];

/** 'active-navigation-item' → 'ActiveNavigationItem' */
const toPascal = s =>
  s
    .split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

// Layout template for header variant shells (no router-outlet — self-contained page)
const variantLayoutTemplate = `<!-- COMPONENT:Header -->

<div class="container my-16">
  <!-- COMPONENT:Breadcrumbs -->
</div>

<main class="container my-16">
  <h1>Header: VARIANT_NAME</h1>
</main>

<!-- COMPONENT:BackToTop -->
<!-- COMPONENT:Footer -->`;

for (const [variantName, variantHtml] of headerVariants) {
  const pascal = toPascal(variantName);
  const componentClass = `Header${pascal}Component`;
  const routeSlug = `header-${variantName}`;

  // Build the full shell HTML by substituting all COMPONENT placeholders
  const html = variantLayoutTemplate
    .replace('VARIANT_NAME', variantName)
    .replaceAll(/<!-- COMPONENT:(\w+) -->/g, (_, name) => {
      if (name === 'Header') return transformToAngular(variantHtml);
      const entry = components[name];
      if (!entry) return `<!-- WARNING: ${name} not found -->`;
      // Only BackToTop has a story scaffold with a demo header inside — strip it
      return transformToAngular(
        name === 'BackToTop' ? stripStoryScaffold(getHtml(entry)) : getHtml(entry),
      );
    });

  const variantImports = [
    ...new Set(
      [...html.matchAll(/<(post-[a-z-]+)/g)].map(
        ([, tag]) => 'Post' + toPascal(tag.replace(/^post-/, '')),
      ),
    ),
  ].sort((a, b) => a.localeCompare(b));

  const importBlock =
    variantImports.length > 0
      ? `\nimport {\n  ${variantImports.join(',\n  ')},\n} from 'components';\n`
      : '';
  const importsList = variantImports.length > 0 ? `\n    ${variantImports.join(',\n    ')},` : '';

  const ts = `import { Component } from '@angular/core';${importBlock}
@Component({
  selector: '${routeSlug}-page',
  templateUrl: './${routeSlug}.component.html',
  standalone: true,
  imports: [${importsList}
  ],
})
export class ${componentClass} {}
`;

  const variantPath = path.join(basePath, 'routes', routeSlug);
  fs.mkdirSync(variantPath, { recursive: true });
  fs.writeFileSync(path.join(variantPath, `${routeSlug}.component.html`), html, 'utf8');
  fs.writeFileSync(path.join(variantPath, `${routeSlug}.component.ts`), ts, 'utf8');
  console.log(`✅ ${routeSlug}.component.html + .ts written`);
}

// ─── ROUTING ─────────────────────────────────────────────────────────────────

const routingPath = path.join(basePath, 'app-routing.module.ts');

const headerRouteEntries = headerVariants.map(([variantName]) => {
  const pascal = toPascal(variantName);
  const slug = `header-${variantName}`;
  return { variantName, pascal, slug, title: `Header: ${variantName}` };
});

const routingImports = [
  `import { HomeComponent } from './routes/home/home.component';`,
  ...headerRouteEntries.map(
    r => `import { Header${r.pascal}Component } from './routes/${r.slug}/${r.slug}.component';`,
  ),
].join('\n');

const routingRoutes = [
  `  { path: '', redirectTo: 'home', pathMatch: 'full' },`,
  `  { title: 'Home', path: 'home', component: HomeComponent },`,
  ...headerRouteEntries.map(
    r => `  { title: '${r.title}', path: '${r.slug}', component: Header${r.pascal}Component },`,
  ),
].join('\n');

const routingTs = `// This file is auto-generated. Do not edit manually.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
${routingImports}

const routes: Routes = [
${routingRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
`;

fs.writeFileSync(routingPath, routingTs, 'utf8');
console.log(`✅ app-routing.module.ts written`);
