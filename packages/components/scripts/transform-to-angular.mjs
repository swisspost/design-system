import {
  propTypes,
  removeHtmlComments,
  convertAttributes,
  selfCloseVoidElements,
  cleanupHtml,
} from './utils.mjs';

export function transformToAngular(html) {
  const transformed = removeHtmlComments(html)
    // Strip inline CSS custom properties (e.g. --post-header-scroll-parent-height: 1549px)
    .replaceAll(/style="([^"]*)"/g, (_, styles) => {
      const cleaned = styles
        .split(';')
        .filter(s => s.trim() && !s.trim().startsWith('--'))
        .join(';')
        .trim();
      return cleaned ? `style="${cleaned}"` : '';
    })

    // Convert kebab-case attributes to camelCase on post-* components (skip aria-*)
    // <post-header text-menu="Menu"> → <post-header textMenu="Menu">
    .replaceAll(/<post-[\w-]+((?:\s+[\w-]+(?:="[^"]*")?)*)\s*>/g, tag =>
      tag.replaceAll(/\s(?!aria-)([a-z]+(?:-[a-z]+)+)=/g, attr =>
        attr.replaceAll(/-([a-z])/g, (_, c) => c.toUpperCase()),
      ),
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

      const convertedAttrs = convertAttributes(attrs, componentProps, (name, value, type, attr) => {
        if (type === 'number' && /^\d+$/.test(value)) return `[${name}]="${value}"`;
        if (type === 'boolean') return `[${name}]="${value}"`;
        return attr;
      });

      return `${tag} ${convertedAttrs.trim()}>`;
    });

  return cleanupHtml(selfCloseVoidElements(transformed));
}
