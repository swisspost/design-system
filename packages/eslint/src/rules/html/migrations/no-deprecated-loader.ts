import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-deprecated-loader';

// Type: RuleModule<"uppercase", ...>
export default createRule({
  name,
  meta: {
    docs: {
      dir: 'html',
      description:
        'Flags deprecated "loader-xs" and "loader-sm" classes and replaces them with "loader-16" and "loader-40" respectively.',
    },
    messages: {
      deprecatedLoaderXS:
        'The "loader-xs" class is deprecated. Please replace it with "loader-16".',
      deprecatedLoaderSM:
        'The "loader-sm" class is deprecated. Please replace it with "loader-40".',
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

        if ($node.hasClass('loader-xs')) {
          context.report({
            messageId: 'deprecatedLoaderXS',
            loc: node.loc,
            fix(fixer) {
              const fixedNode = $node.removeClass('loader-xs').addClass('loader-16');
              return fixer.replaceTextRange(node.range, fixedNode.toString());
            },
          });
        }

        if ($node.hasClass('loader-sm')) {
          context.report({
            messageId: 'deprecatedLoaderSM',
            loc: node.loc,
            fix(fixer) {
              const fixedNode = $node.removeClass('loader-sm').addClass('loader-40');
              return fixer.replaceTextRange(node.range, fixedNode.toString());
            },
          });
        }

      },
    };
  },
});
