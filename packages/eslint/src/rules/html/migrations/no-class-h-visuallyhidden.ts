import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-class-h-visuallyhidden';

// Type: RuleModule<"uppercase", ...>
export default createRule({
  name,
  meta: {
    docs: {
      dir: 'html',
      description:
        'Flags deprecated "h-visuallyhidden" class and replaces it with "visually-hidden".',
    },
    messages: {
      noClassHVisuallyhidden:
        'The "h-visuallyhidden" class is deprecated. Please replace it with "visually-hidden".',
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      tag(node: HtmlNode) {
        const $node = node.toCheerio();

        if ($node.hasClass('h-visuallyhidden')) {
          context.report({
            messageId: 'noClassHVisuallyhidden',
            loc: node.loc,
            fix(fixer) {
              const fixedNode = $node.removeClass('h-visuallyhidden').addClass('visually-hidden');
              return fixer.replaceTextRange(node.range, fixedNode.toString());
            },
          });
        }
      },
    };
  },
});
