import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const propTypes = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../output/prop-types.json'), 'utf8'),
);

function removeHtmlComments(input) {
  let sanitized;

  do {
    sanitized = input;
    input = input.replaceAll(/<!--[\s\S]*?-->/g, '');
  } while (input !== sanitized);

  return input;
}

export function transformToAngular(html) {
  return (
    // Remove HTML and Lit comments
    // <!--?lit$123$--> → ''
    removeHtmlComments(html)
      // Convert kebab-case attributes to camelCase on post-* components (skip aria-*)
      // <post-header text-menu="Menu"> → <post-header textMenu="Menu">
      // Convert all kebab-case attributes to camelCase on post-* tags (skip aria-*)
      .replaceAll(/<post-[\w-]+((?:\s+[\w-]+(?:="[^"]*")?)*)\s*>/g, tag =>
        tag.replaceAll(/\s(?!aria-)([a-z]+(?:-[a-z]+)+)=/g, attr => {
          return attr.replaceAll(/-([a-z])/g, (_, c) => c.toUpperCase());
        }),
      )

      // Type-aware attribute conversion using prop-types.json
      // headingLevel="3" → [headingLevel]="3" (number)
      // multiple="true" → [multiple]="true" (boolean)
      // name="search" → name="search" (string, unchanged)
      .replaceAll(/(<post-[\w-]+)((?:\s+[\w-]+(?:="[^"]*")?)*)\s*>/g, (match, tag, attrs) => {
        const componentName =
          'Post' +
          tag
            .replaceAll('<post-', '')
            .split('-')
            .map(p => p.charAt(0).toUpperCase() + p.slice(1))
            .join('');
        const componentProps = propTypes[componentName] ?? {};

        let convertedAttrs = '';
        for (const attr of attrs.split(/\s+/)) {
          const eqIndex = attr.indexOf('="');
          if (eqIndex === -1) {
            convertedAttrs += ` ${attr}`;
            continue;
          }

          const name = attr.slice(0, eqIndex);
          const value = attr.slice(eqIndex + 2, -1);

          const kebab = name.replaceAll(/([A-Z])/g, c => `-${c.toLowerCase()}`);
          const type = componentProps[kebab] ?? componentProps[name];

          if (type === 'number' && /^\d+$/.test(value)) {
            convertedAttrs += ` [${name}]="${value}"`;
          } else if (type === 'boolean') {
            convertedAttrs += ` [${name}]="${value}"`;
          } else {
            convertedAttrs += ` ${attr}`;
          }
        }

        return `${tag} ${convertedAttrs.trim()}>`;
      })

      // Self-closing void elements
      // <img src="foo.png"> → <img src="foo.png" />
      .replaceAll(
        /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g,
        (_, tag, attrs) => `<${tag}${attrs} />`,
      )

      // Clean up multiple blank lines
      .replaceAll(/\n{3,}/g, '\n\n')

      // Remove empty lines
      .replaceAll(/^[\t ]*\r?\n/gm, '')

      .trim()
  );
}
