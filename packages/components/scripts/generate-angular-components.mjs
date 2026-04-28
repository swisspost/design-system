import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToAngular } from './transform-to-angular.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsPath = path.resolve(__dirname, '../output/markup-map.json');
const basePath = path.resolve(__dirname, '../../components-angular/projects/consumer-app/src/app');
const appTsPath = path.join(basePath, 'app.component.ts');

const LAYOUT_COMPONENTS = new Set(['Header', 'Footer', 'BackToTop', 'Breadcrumbs']);

// Ensure markup-map.json exists
fs.mkdirSync(path.dirname(componentsPath), { recursive: true });
if (!fs.existsSync(componentsPath)) {
  fs.writeFileSync(componentsPath, '{}', 'utf8');
  console.log(`✅ Created ${componentsPath}`);
}

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf8'));

if (Object.keys(components).length === 0) {
  throw new Error('⚠️ No components found in markup-map.json — run Cypress tests first');
}

// Extract raw HTML from entry (plain string or { html, title } object)
function getHtml(entry) {
  return typeof entry === 'string' ? entry : entry.html;
}

// Scan HTML for post-* tags and return sorted PascalCase import names
function collectImports(entries) {
  const allImports = new Set();
  for (const entry of entries) {
    for (const [, tag] of getHtml(entry).matchAll(/<(post-[a-z-]+)/g)) {
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
  return [...allImports].sort((a, b) => a.localeCompare(b));
}

// ─── HOME COMPONENT ───────────────────────────────────────────────────────────

// Filter out layout components — home only shows non-layout components
const homeEntries = Object.entries(components).filter(([name]) => !LAYOUT_COMPONENTS.has(name));

const homeImports = collectImports(homeEntries.map(([, e]) => e));

const homeHtml =
  homeEntries
    .map(([name, entry]) => {
      const title = typeof entry === 'string' ? name : entry.title;
      const heading = title ? `<h2>${title}</h2>\n` : '';
      return `<div class="my-24">\n  ${heading}  ${transformToAngular(getHtml(entry))}\n</div>`;
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

const homeTs = `import { Component } from '@angular/core';
import {
  ${homeImports.join(',\n  ')},
} from 'components';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    ${homeImports.join(',\n    ')},
  ],
})
export class HomeComponent {}
`;

const homePath = path.join(basePath, 'routes/home');
fs.mkdirSync(homePath, { recursive: true });
fs.writeFileSync(path.join(homePath, 'home.component.html'), homeHtml, 'utf8');
fs.writeFileSync(path.join(homePath, 'home.component.ts'), homeTs, 'utf8');
console.log(`✅ home.component.html + .ts written`);

// ─── APP COMPONENT ────────────────────────────────────────────────────────────

// Layout structure with COMPONENT placeholders
const layoutTemplate = `
<!-- COMPONENT:Header -->

<header class="palette palette-alternate my-24">
  <nav class="container py-12">
    <p class="mb-12"><strong>Component Showcase Routes:</strong></p>
    <ul class="d-flex flex-wrap row-gap-4 column-gap-16 m-0 list-unstyled">
      <li *ngFor="let route of navigationRoutes">
        <a [routerLink]="route.path">{{ route.title }}</a>
      </li>
    </ul>
  </nav>
</header>

<div class="container my-16">
  <!-- COMPONENT:Breadcrumbs -->
</div>

<main class="container my-16">
  <h1>Hurray, it works!</h1>
  <router-outlet></router-outlet>
</main>

<!-- COMPONENT:BackToTop -->
<!-- COMPONENT:Footer -->`;

// Replace placeholders with captured markup from markup-map.json
const appHtml = layoutTemplate.replaceAll(/<!-- COMPONENT:(\w+) -->/g, (_, name) => {
  const entry = components[name];
  console.log(`COMPONENT:${name}`, entry ? 'found' : 'NOT FOUND'); // ← add this
  if (!entry) return `<!-- WARNING: ${name} not found -->`;
  return transformToAngular(getHtml(entry));
});

// Collect imports only from layout components
const allImports = collectImports(
  Object.entries(components)
    .filter(([name]) => LAYOUT_COMPONENTS.has(name))
    .map(([, e]) => e),
);

// Update only the imports in the existing app.component.ts
if (fs.existsSync(appTsPath)) {
  const updated = fs
    .readFileSync(appTsPath, 'utf8')
    .replace(
      /import \{[^}]+\} from 'components';/,
      `import {\n  ${allImports.join(',\n  ')},\n} from 'components';`,
    )
    .replace(
      /imports: \[\n([\s\S]*?)\],/,
      `imports: [\n    CommonModule,\n    RouterOutlet,\n    RouterLink,\n    ${allImports.join(',\n    ')},\n  ],`,
    );
  fs.writeFileSync(appTsPath, updated, 'utf8');
  console.log(`✅ app.component.ts imports updated`);
} else {
  console.log('⚠️ app.component.ts not found — skipping');
}

// Write generated app HTML
fs.writeFileSync(path.join(basePath, 'app.component.html'), appHtml, 'utf8');
console.log(`✅ app.component.html written`);
