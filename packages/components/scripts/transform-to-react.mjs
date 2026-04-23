import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const propTypes = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../output/prop-types.json'), 'utf-8'),
);

export function transformToReact(html) {
  return (
    html
      // Remove HTML and Lit comments
      // <!--?lit$123$--> → ''
      .replaceAll(/<!--[\s\S]*?-->/g, '')

      // Convert style strings to JSX objects
      // style="color: red; font-size: 1rem" → style={{ color: 'red', fontSize: '1rem' }}
      .replaceAll(/style="([^"]*)"/g, (_, styles) => {
        const obj = styles
          .split(';')
          .filter(s => s.trim())
          .map(s => {
            const [prop, ...val] = s.split(':');
            const camelProp = prop.trim().replaceAll(/-([a-z])/g, (_, c) => c.toUpperCase());
            return `${camelProp}: '${val.join(':').trim()}'`;
          })
          .join(', ');
        return `style={{ ${obj} }}`;
      })

      // class → className
      // <div class="foo"> → <div className="foo">
      .replaceAll(/\bclass=/g, 'className=')

      // for → htmlFor only on <label> tags
      // <label for="input"> → <label htmlFor="input">
      .replaceAll(/<label([^>]*)\bfor=/g, '<label$1htmlFor=')

      // Convert post-* tags to PascalCase
      // <post-back-to-top> → <PostBackToTop>
      .replaceAll(/<(\/?)post-([a-z]+(?:-[a-z]+)*)/g, (_, closing, name) => {
        const pascal =
          'Post' +
          name
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
        return `<${closing}${pascal}`;
      })

      // Convert kebab-case attributes to camelCase on Post components (skip aria-*)
      // <PostHeader text-menu="Menu"> → <PostHeader textMenu="Menu">
      .replaceAll(/<Post[A-Za-z]+((?:\s+[\w-]+(?:="[^"]*")?)*)\s*>/g, tag =>
        tag.replaceAll(/\s(?!aria-)([a-z]+(?:-[a-z]+)+)=/g, attr =>
          attr.replaceAll(/-([a-z])/g, (_, c) => c.toUpperCase()),
        ),
      )

      // Type-aware attribute conversion using prop-types.json
      // headingLevel="3" → headingLevel={3} (number)
      // multiple="true" → multiple={true} (boolean)
      // name="search" → name="search" (string, unchanged)
      .replaceAll(/(<Post\w+)((?:\s+[\w-]+(?:="[^"]*")?)*)\s*>/g, (match, tag, attrs) => {
        const componentName = tag.slice(1);
        const componentProps = propTypes[componentName] ?? {};
        const convertedAttrs = attrs.replaceAll(
          /(\w+)="([^"]{0,9999})"/g,
          (attrMatch, name, value) => {
            const kebab = name.replaceAll(/([A-Z])/g, c => `-${c.toLowerCase()}`);
            const type = componentProps[kebab] ?? componentProps[name];
            if (type === 'number' && /^\d+$/.test(value)) return `${name}={${value}}`;
            if (type === 'boolean') return value === 'true' ? `${name}={true}` : `${name}={false}`;
            return attrMatch;
          },
        );
        return `${tag}${convertedAttrs}>`;
      })

      // Self-closing void elements
      // <img src="foo.png"> → <img src="foo.png" />
      .replaceAll(
        /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g,
        (_, tag, attrs) => `<${tag}${attrs} />`,
      )

      // Self-closing empty Post components
      // <PostBackToTop></PostBackToTop> → <PostBackToTop />
      .replaceAll(/<(Post[A-Za-z]+)([^>]*)>[\t\n\r ]*<\/\1>/g, '<$1$2 />')

      // Clean up multiple blank lines
      .replaceAll(/\n{3,}/g, '\n\n')

      // Remove empty lines
      .replaceAll(/^[\t ]*\r?\n/gm, '')

      .trim()
  );
}
