import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-class-h-clearfix';

// Type: RuleModule<"uppercase", ...>
export default createRule({
  name,
  meta: {
    docs: {
      dir: 'html',
      description:
        'Flags deprecated "h-clearfix" class and suggests removal or replacement with "clearfix".',
    },
    messages: {
      noClassHClearfix:
        'The "h-clearfix" class is deprecated. Please remove it or replace it with "clearfix".',
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

        if ($node.hasClass('h-clearfix')) {
          context.report({
            messageId: 'noClassHClearfix',
            loc: node.loc,
            fix(fixer) {
              const fixedNode = $node.removeClass('h-clearfix').addClass('clearfix');
              return fixer.replaceTextRange(node.range, fixedNode.toString());
            },
          });
        }
      },
    };
  },
});
