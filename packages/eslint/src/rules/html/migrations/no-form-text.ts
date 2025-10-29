import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-form-text';

// Type: RuleModule<"uppercase", ...>
export default createRule({
  name,
  meta: {
    docs: {
      dir: 'html',
      description: 'Replaces deprecated "form-text" class with "form-hint".',
    },
    messages: {
      stopUsingFormText: 'The "form-text" class has been replaced by "form-hint.',
    },
    type: 'problem',
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      tag(node: HtmlNode) {
        const $node = node.toCheerio();
        if ($node.hasClass('form-text')) {
          context.report({
            messageId: 'stopUsingFormText',
            loc: node.loc,
            fix(fixer) {
              const fixedNode = $node.removeClass('form-text').addClass('form-hint');
              return fixer.replaceTextRange(node.range, fixedNode.toString());
            },
          });
        }
      },
    };
  },
});
