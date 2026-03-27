import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToReact } from './transform-to-react.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsPath = path.resolve(__dirname, '../output/markup-map.json');
const outputPath = path.resolve(__dirname, '../../nextjs-integration/src/app/ssr/page.tsx');

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

// Collect all imports
const allImports = new Set();
Object.values(components).forEach(html => {
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

const LAYOUT_COMPONENTS = ['Header', 'Footer', 'BackToTop', 'Breadcrumbs'];

// Render all components one after another
const rendered = Object.entries(components)
  .filter(([name]) => !LAYOUT_COMPONENTS.includes(name))
  .map(([name, html]) => ` <h4>${name}</h4>\n  {/* ${name} */}\n  ${transformToReact(html)}`)
  .join('\n\n');

const page = `import { ${[...allImports].sort().join(', ')} } from '@swisspost/design-system-components-react/server';

export default function Page() {
  return (
    <>
     <h1>Design System Components</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea debitis ex rem minus! Ut
        mollitia deserunt iure impedit. Enim, officia. Fugiat, cupiditate repellat? Excepturi est
        iusto suscipit, omnis iste laboriosam!
      </p>
${rendered}
    </>
  );
}
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, page, 'utf-8');
console.log(`✅ page.tsx written → ${outputPath}`);
