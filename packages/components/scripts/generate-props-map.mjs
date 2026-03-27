import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(__dirname, '../dist/docs.json');
const outputPath = '../components/output/prop-types.json';

const docs = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const propTypes = {};

docs.components.forEach(component => {
  // post-accordion → PostAccordion
  const componentName = component.tag
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  propTypes[componentName] = {};

  component.props.forEach(prop => {
    const type = prop.type.trim();

    // Use the attr name (kebab-case) as key since that's what appears in HTML
    const attrName = prop.attr;
    if (!attrName) return; // skip props with no attr (methods etc.)

    if (/^(\d+\s*\|?\s*)+$/.test(type)) {
      // e.g. "1 | 2 | 3 | 4 | 5 | 6" → number
      propTypes[componentName][attrName] = 'number';
    } else if (type === 'number') {
      propTypes[componentName][attrName] = 'number';
    } else if (type === 'boolean') {
      propTypes[componentName][attrName] = 'boolean';
    } else {
      propTypes[componentName][attrName] = 'string';
    }
  });
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(propTypes, null, 2), 'utf-8');
console.log(`✅ prop-types.json written → ${outputPath}`);
