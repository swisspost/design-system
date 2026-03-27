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
      // Remove all HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Keep class= as is (Angular uses class not className)
      // Keep for= as is (Angular uses for not htmlFor)
      // Convert post-* tags to PascalCase — NOT needed for Angular, tags stay as post-*
      // Convert kebab-case attributes to camelCase on post-* components (skip aria-*)
      .replace(/(<post-[a-z-]+[^>]*?)(\s(?!aria-)([a-z]+(?:-[a-z]+)+)=)/g, (match, tag, attr) => {
        const camel = attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return `${tag}${camel}`;
      })
      // Type-aware attribute conversion using prop-types.json
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
      .replace(
        /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g,
        (_, tag, attrs) => `<${tag}${attrs} />`,
      )
      // Clean up
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s*[\r\n]/gm, '')
      .trim()
  );
}
