import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-deprecated-font-weights';

export default createRule({
  name,
  meta: {
    docs: {
      dir: 'html',
      description:
        'Flags "bold" and "regular" classes and replaces them with "fw-bold" and "fw-regular".',
    },
    messages: {
      deprecatedRegular:
        'The "regular" class has been deleted. Please replace it with "fw-regular".',
      deprecatedBold: 'The "bold" class has been deleted. Please replace it with "fw-bold".',
    },
    type: 'problem',
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      tag(node: HtmlNode) {
        if (node.name) {
          const $node = node.toCheerio();

          if ($node.hasClass('regular')) {
            context.report({
              messageId: 'deprecatedRegular',
              loc: node.loc,
              fix(fixer) {
                const fixedNode = $node.removeClass('regular').addClass('fw-regular');
                return fixer.replaceTextRange(node.range, fixedNode.toString());
              },
            });
          }

          if ($node.hasClass('bold')) {
            context.report({
              messageId: 'deprecatedBold',
              loc: node.loc,
              fix(fixer) {
                const fixedNode = $node.removeClass('bold').addClass('fw-bold');
                return fixer.replaceTextRange(node.range, fixedNode.toString());
              },
            });
          }
        }
      },
    };
  },
});
