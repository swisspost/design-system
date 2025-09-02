import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-unnumbered-border-radius';

const classesMap = [
  { old: 'rounded', new: 'rounded-4' },
  { old: 'rounded-top', new: 'rounded-top-4' },
  { old: 'rounded-bottom', new: 'rounded-bottom-4' },
  { old: 'rounded-start', new: 'rounded-start-4' },
  { old: 'rounded-end', new: 'rounded-end-4' },
];

function getRemovedRoundedClassMsgs(): Record<string, string> {
  return classesMap.reduce(
    (o, key) =>
      Object.assign(o, {
        [key.old]: `The "${key.old}" class has been deleted. Please remove it or replace it with "${key.new}".`,
      }),
    {},
  );
}

export default createRule({
  name,
  meta: {
    docs: {
      dir: 'html',
      description:
        'Flags "rounded" and "rounded-{top|bottom|start|end}" classes and replaces them with "rounded-4" and "rounded-{top|bottom|start|end}-4", respectively.',
    },
    messages: getRemovedRoundedClassMsgs(),
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

          classesMap.forEach(classMapEl => {
            if ($node.hasClass(classMapEl.old)) {
              context.report({
                messageId: classMapEl.old,
                loc: node.loc,
                fix(fixer) {
                  const fixedNode = $node.removeClass(classMapEl.old).addClass(classMapEl.new);
                  return fixer.replaceTextRange(node.range, fixedNode.toString());
                },
              });
            }
          });
        }
      },
    };
  },
});
