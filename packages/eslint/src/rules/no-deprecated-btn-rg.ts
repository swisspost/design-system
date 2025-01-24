import { createRule } from '../utils/create-rule';
import { TemplateNode } from '../template-parser/template-node';

export const name = 'no-deprecated-btn-rg';

// Type: RuleModule<"uppercase", ...>
export default createRule({
  name,
  meta: {
    docs: {
      category: 'template',
      description:
        'Flags deprecated "btn-rg" class and suggests removal or replacement with "btn-sm".',
    },
    messages: {
      deprecatedBtnRg:
        'The "btn-rg" class is deprecated. Please remove it or replace it with "btn-sm".',
    },
    type: 'suggestion',
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      tag(node: TemplateNode) {
        if (node.name && ['button', 'input', 'a'].includes(node.name)) {
          const $node = node.toCheerio();
          if ($node.hasClass('btn-rg')) {
            context.report({
              messageId: 'deprecatedBtnRg',
              loc: node.loc,
              fix(fixer) {
                const fixedNode = $node.removeClass('btn-rg').addClass('btn-sm');
                return fixer.replaceTextRange(node.range, fixedNode.toString());
              },
            });
          }
        }
      },
    };
  },
});
