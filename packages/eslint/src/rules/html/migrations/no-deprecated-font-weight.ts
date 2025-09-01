import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-deprecated-font-weights';

const classesMap = [
  { old: 'bold', new: 'fw-bold' },
  { old: 'regular', new: 'fw-regular' },
];

function getChangedFontWeightClassMsgs(): Record<string, string> {
  return classesMap.reduce(
    (o, key) =>
      Object.assign(o, {
        [key.old]: `The "${key.old}" class has been deleted. Please replace it with "${key.new}".`,
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
        'Flags "bold" and "regular" classes and replaces them with "fw-bold" and "fw-regular".',
    },
    messages: getChangedFontWeightClassMsgs(),
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
