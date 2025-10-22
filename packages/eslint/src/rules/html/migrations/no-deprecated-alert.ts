import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-deprecated-alert';

export default createRule({
  name,
  meta: {
    docs: {
      dir: 'html',
      description: 'Flags deprecated "post-alert" and replaces it with "post-banner".',
    },
    messages: {
      deprecatedAlert:
        'The "post-alert" component has been deleted. Please replace it with "post-banner".',
    },
    type: 'problem',
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      tag(node: HtmlNode) {
        if (node.name && node.name === 'post-alert') {
          if (node.name === 'post-alert') {
            const $node = node.toCheerio();

            if ($node[0] && typeof $node[0] === 'object' && 'name' in $node[0]) {
              $node[0].name = 'post-banner';

              context.report({
                messageId: 'deprecatedAlert',
                loc: node.loc,
                fix(fixer) {
                  const fixedHtml = $node.toString();
                  return fixer.replaceTextRange(node.range, fixedHtml);
                },
              });
            }
          }
        }
      },
    };
  },
});
