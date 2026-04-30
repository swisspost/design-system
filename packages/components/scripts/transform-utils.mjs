import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const propTypes = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../output/prop-types.json'), 'utf8'),
);

export function removeHtmlComments(input) {
  let sanitized;

  do {
    sanitized = input;
    input = input.replaceAll(/<!--[\s\S]*?-->/g, '');
  } while (input !== sanitized);

  return input;
}

/**
 * Converts a parsed attribute string into a transformed list.
 * @param {string} attrs - Raw attribute string from the regex match.
 * @param {object} componentProps - Prop type map for the component.
 * @param {(name: string, value: string, type: string|undefined, attr: string) => string} formatAttr
 *   Called for each key=value attribute; return the replacement attribute string (without leading space).
 */
export function convertAttributes(attrs, componentProps, formatAttr) {
  let convertedAttrs = '';

  for (const attr of attrs.split(/\s+/).filter(Boolean)) {
    const eqIndex = attr.indexOf('="');
    if (eqIndex === -1) {
      convertedAttrs += ` ${attr}`;
      continue;
    }

    const name = attr.slice(0, eqIndex);
    const value = attr.slice(eqIndex + 2, -1);
    const kebab = name.replaceAll(/([A-Z])/g, c => `-${c.toLowerCase()}`);
    const type = componentProps[kebab] ?? componentProps[name];

    convertedAttrs += ` ${formatAttr(name, value, type, attr)}`;
  }

  return convertedAttrs;
}

export function selfCloseVoidElements(html) {
  return html.replaceAll(
    /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g,
    (_, tag, attrs) => `<${tag}${attrs} />`,
  );
}

export function cleanupHtml(html) {
  return html
    .replaceAll(/\n{3,}/g, '\n\n')
    .replaceAll(/^[\t ]*\r?\n/gm, '')
    .trim();
}
