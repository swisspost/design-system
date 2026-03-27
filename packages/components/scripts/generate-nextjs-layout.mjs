import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToReact } from './transform-to-react.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(__dirname, '../../nextjs-integration/src/app/ssr/layout.tsx');
const componentsPath = path.resolve(__dirname, '../output/markup-map.json');
const outputPath = path.resolve(__dirname, '../../nextjs-integration/src/app/ssr/layout.tsx');

// Create layout file if it doesn't exist

fs.mkdirSync(path.dirname(templatePath), { recursive: true });
fs.writeFileSync(
  templatePath,
  `export default function Layout({ children }: { readonly children: React.ReactNode }) {
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
}`,
  'utf-8',
);
console.log(`✅ Created ${templatePath} — edit this file to customise your layout`);

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));
const template = fs.readFileSync(templatePath, 'utf-8');

// Collect imports from components used in template
const usedNames = [...template.matchAll(/\{\/\* COMPONENT:(\w+) \*\/\}/g)].map(([, name]) => name);

const allImports = new Set();
usedNames.forEach(name => {
  const html = components[name];
  if (!html) return;
  [...html.matchAll(/<(post-[a-z-]+)/g)].forEach(([, tag]) => {
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

// Replace component placeholders
let result = template.replace(/\{\/\* COMPONENT:(\w+) \*\/\}/g, (_, name) => {
  const html = components[name];
  if (!html) return `{/* WARNING: ${name} not found in markup-map.json */}`;
  return transformToReact(html);
});

// Prepend import at the top (remove any existing ones first)
result = result
  .replace(/^import type React from 'react';\n?/m, '')
  .replace(/^import \{[^}]*\} from '@swisspost\/design-system-components-react\/server';\n?/m, '');

result = `import { ${[...allImports].sort().join(', ')} } from '@swisspost/design-system-components-react/server';\n\n${result}`;

// Clean empty lines
result = result.replace(/^\s*[\r\n]/gm, '');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, result, 'utf-8');
console.log(`✅ layout.tsx written → ${outputPath}`);
