import {
  propTypes,
  removeHtmlComments,
  convertAttributes,
  selfCloseVoidElements,
  cleanupHtml,
} from './utils.mjs';

export function transformToReact(html) {
  const transformed = removeHtmlComments(html)
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

    // Convert kebab-case attributes to camelCase on Post components (skip aria-*, data-*)
    // <PostHeader text-menu="Menu"> → <PostHeader textMenu="Menu">
    .replaceAll(/<Post[A-Za-z]+((?:\s+[\w-]+(?:="[^"]*")?)*)\s*>/g, tag =>
      tag.replaceAll(/\s(?!aria-)(?!data-)([a-z]+(?:-[a-z]+)+)=/g, attr =>
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

      const convertedAttrs = convertAttributes(attrs, componentProps, (name, value, type, attr) => {
        if (type === 'number' && /^\d+$/.test(value)) return `${name}={${value}}`;
        if (type === 'boolean') return value === 'true' ? `${name}={true}` : `${name}={false}`;
        return attr;
      });

      return `${tag} ${convertedAttrs.trim()}>`;
    });

  return cleanupHtml(
    // Self-closing empty Post components
    // <PostBackToTop></PostBackToTop> → <PostBackToTop />
    selfCloseVoidElements(transformed).replaceAll(
      /<(Post[A-Za-z]+)((?:\s+[\w-]+(?:="[^"]*")?)*)\s*>[\t\n\r ]*<\/\1>/g,
      '<$1$2 />',
    ),
  );
}
