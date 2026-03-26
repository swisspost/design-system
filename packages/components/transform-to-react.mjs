import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const propTypes = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'output/prop-types.json'), 'utf-8'),
);
export function transformToReact(html) {
  return (
    html
      // ✅ Remove comments FIRST
      .replace(/<!--[\s\S]*?-->/g, '')
      // Convert style strings to JSX objects
      .replace(/style="([^"]*)"/g, (_, styles) => {
        const obj = styles
          .split(';')
          .filter(s => s.trim())
          .map(s => {
            const [prop, ...val] = s.split(':');
            const camelProp = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            return `${camelProp}: '${val.join(':').trim()}'`;
          })
          .join(', ');
        return `style={{ ${obj} }}`;
      })
      .replace(/\bclass=/g, 'className=')
      .replace(/<label([^>]*)\bfor=/g, '<label$1htmlFor=')
      .replace(/<(\/?)post-([a-z]+(?:-[a-z]+)*)/g, (_, closing, name) => {
        const pascal =
          'Post' +
          name
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
        return `<${closing}${pascal}`;
      })
      .replace(/(<Post[A-Za-z]+[^>]*?)(\s(?!aria-)([a-z]+(?:-[a-z]+)+)=)/g, (match, tag, attr) => {
        const camel = attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return `${tag}${camel}`;
      })
      .replace(/(<Post\w+)((?:\s+[^>]*?)*?)>/g, (match, tag, attrs) => {
        const componentName = tag.replace('<', '');
        const componentProps = propTypes[componentName] ?? {};

        const convertedAttrs = attrs.replace(/(\w+)="([^"]*)"/g, (attrMatch, name, value) => {
          // ✅ fixed kebab conversion - insert dash before uppercase letters
          const kebab = name.replace(/([A-Z])/g, c => `-${c.toLowerCase()}`);
          const type = componentProps[kebab] ?? componentProps[name];
          if (type === 'number' && /^\d+$/.test(value)) return `${name}={${value}}`;
          if (type === 'boolean') return value === 'true' ? `${name}={true}` : `${name}={false}`;
          return attrMatch;
        });

        return `${tag}${convertedAttrs}>`;
      })
      .replace(
        /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g,
        (_, tag, attrs) => `<${tag}${attrs} />`,
      )
      .replace(/<(Post[A-Za-z]+)([^>]*)>\s*<\/\1>/g, '<$1$2 />')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s*[\r\n]/gm, '')
      .trim()
  );
}
