import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const propTypes = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../output/prop-types.json'), 'utf-8'),
);

export function transformToAngular(html) {
  return (
    html
      // Remove HTML and Lit comments
      // <!--?lit$123$--> → ''
      .replace(/<!--[\s\S]*?-->/g, '')

      // Convert kebab-case attributes to camelCase on post-* components (skip aria-*)
      // <post-header text-menu="Menu"> → <post-header textMenu="Menu">
      // Convert all kebab-case attributes to camelCase on post-* tags (skip aria-*)
      .replace(/<post-[\w-]+[^>]*>/g, tag =>
        tag.replace(/\s(?!aria-)([a-z]+(?:-[a-z]+)+)=/g, attr => {
          return attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        }),
      )

      // Type-aware attribute conversion using prop-types.json
      // headingLevel="3" → [headingLevel]="3" (number)
      // multiple="true" → [multiple]="true" (boolean)
      // name="search" → name="search" (string, unchanged)
      .replace(/(<post-[\w-]+)((?:\s+[^>]*?)*?)>/g, (match, tag, attrs) => {
        const componentName =
          'Post' +
          tag
            .replace('<post-', '')
            .split('-')
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join('');
        const componentProps = propTypes[componentName] ?? {};

        const convertedAttrs = attrs.replace(/(\w+)="([^"]*)"/g, (attrMatch, name, value) => {
          const kebab = name.replace(/([A-Z])/g, c => `-${c.toLowerCase()}`);
          const type = componentProps[kebab] ?? componentProps[name];
          if (type === 'number' && /^\d+$/.test(value)) return `[${name}]="${value}"`;
          if (type === 'boolean') return `[${name}]="${value}"`;
          return attrMatch;
        });

        return `${tag}${convertedAttrs}>`;
      })

      // Self-closing void elements
      // <img src="foo.png"> → <img src="foo.png" />
      .replace(
        /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g,
        (_, tag, attrs) => `<${tag}${attrs} />`,
      )

      // Clean up multiple blank lines
      .replace(/\n{3,}/g, '\n\n')

      // Remove empty lines
      .replace(/^\s*[\r\n]/gm, '')

      .trim()
  );
}
