import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToAngular } from './transform-to-angular.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsPath = '../output/markup-map.json';
const basePath = path.resolve(__dirname, '../components-angular/projects/consumer-app/src/app');

const LAYOUT_COMPONENTS = ['Header', 'Footer', 'BackToTop', 'Breadcrumbs'];

// Create markup-map.json if it doesn't exist
fs.mkdirSync(path.dirname(componentsPath), { recursive: true });
if (!fs.existsSync(componentsPath)) {
  fs.writeFileSync(componentsPath, '{}', 'utf-8');
  console.log(`✅ Created ${componentsPath}`);
}

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));

if (Object.keys(components).length === 0) {
  console.log('⚠️ No components found in markup-map.json — run Cypress tests first');
  process.exit(0);
}

function getAngularImports(components, filter) {
  const allImports = new Set();
  Object.entries(components)
    .filter(([name]) => filter(name))
    .forEach(([, entry]) => {
      const html = typeof entry === 'string' ? entry : entry.html;
      const matches = [...html.matchAll(/<(post-[a-z-]+)/g)];
      matches.forEach(([, tag]) => {
        const pascal =
          'Post' +
          tag
            .replace(/^post-/, '')
            .split('-')
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join('');
        allImports.add(pascal);
      });
    });
  return [...allImports].sort();
}

// ─── HOME COMPONENT ───────────────────────────────────────────────────────────

const homeImports = getAngularImports(components, name => !LAYOUT_COMPONENTS.includes(name));

const homeHtml = Object.entries(components)
  .filter(([name]) => !LAYOUT_COMPONENTS.includes(name))
  .map(([name, entry]) => {
    const html = typeof entry === 'string' ? entry : entry.html;
    const title = typeof entry === 'string' ? name : (entry.title ?? name);
    const heading = title ? `<h2>${title}</h2>\n` : '';
    return `<div class="my-24">\n  ${heading}  ${transformToAngular(html)}\n</div>`;
  })
  .join('\n\n');

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
fs.writeFileSync(path.join(homePath, 'home.component.html'), homeHtml, 'utf-8');
fs.writeFileSync(path.join(homePath, 'home.component.ts'), homeTs, 'utf-8');
console.log(`✅ home.component.html + .ts written`);

// ─── APP COMPONENT (LAYOUT) ───────────────────────────────────────────────────

const layoutTemplatePath = path.resolve(__dirname, 'layout-angular.template.html');
const layoutTsTemplatePath = path.resolve(__dirname, 'layout-angular.template.ts');

// Create layout template files if they don't exist
if (!fs.existsSync(layoutTemplatePath)) {
  fs.writeFileSync(
    layoutTemplatePath,
    `<!-- COMPONENT:Header -->
<main class="container my-16">
  <router-outlet></router-outlet>
</main>
<!-- COMPONENT:BackToTop -->
<!-- COMPONENT:Footer -->`,
    'utf-8',
  );
  console.log(`✅ Created ${layoutTemplatePath} — edit to customise layout`);
}

const layoutImports = getAngularImports(components, name => LAYOUT_COMPONENTS.includes(name));

const appTs = `import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ${layoutImports.join(',\n  ')},
} from 'components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    ${layoutImports.join(',\n    ')},
  ],
})
export class AppComponent {}
`;

// Replace <!-- COMPONENT:X --> placeholders in template
let layoutHtml = fs.readFileSync(layoutTemplatePath, 'utf-8');
layoutHtml = layoutHtml.replace(/<!-- COMPONENT:(\w+) -->/g, (_, name) => {
  const entry = components[name];
  if (!entry) return `<!-- WARNING: ${name} not found -->`;
  const html = typeof entry === 'string' ? entry : entry.html;
  return transformToAngular(html);
});

fs.writeFileSync(path.join(basePath, 'app.component.html'), layoutHtml, 'utf-8');
fs.writeFileSync(path.join(basePath, 'app.component.ts'), appTs, 'utf-8');
console.log(`✅ app.component.html + .ts written`);
