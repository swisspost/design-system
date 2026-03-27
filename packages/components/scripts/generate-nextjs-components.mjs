import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformToReact } from './transform-to-react.mjs';

const LAYOUT_COMPONENTS = ['Header', 'Footer', 'BackToTop', 'Breadcrumbs'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsPath = path.resolve(__dirname, '../output/markup-map.json');
const outputPath = path.resolve(__dirname, '../../nextjs-integration/src/app/ssr/page.tsx');

// Create markup-map.json if it doesn't exist
fs.mkdirSync(path.dirname(componentsPath), { recursive: true });
if (!fs.existsSync(componentsPath)) {
  fs.writeFileSync(componentsPath, '{}', 'utf-8');
}

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));

if (Object.keys(components).length === 0) {
  console.log('⚠️ No components found in markup-map.json — run Cypress tests first');
  process.exit(0);
}

// Collect all imports
const allImports = new Set();
Object.values(components).forEach(entry => {
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

// Render all components
const rendered = Object.entries(components)
  .filter(([name]) => !LAYOUT_COMPONENTS.includes(name))
  .map(([name, entry]) => {
    const html = typeof entry === 'string' ? entry : entry.html;
    const title = typeof entry === 'string' ? name : entry.title;
    const heading = title ? `  <h2>${title}</h2>\n` : '';
    return `${heading}  ${transformToReact(html)}`;
  })
  .join('\n\n');

const page = `import { ${[...allImports].sort().join(', ')} } from '@swisspost/design-system-components-react/server';
import { PostIconExplosives, PostIconLetter, PostIconLetterSolid } from '@swisspost/design-system-components-react/icons';

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

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, page, 'utf-8');
console.log(`✅ page.tsx written → ${outputPath}`);
