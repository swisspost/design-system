import { createRule } from '../../../utils/create-rule';
import { HtmlNode } from '../../../parsers/html/html-node';

export const name = 'no-deprecated-font-sizes';

interface FontSizeClassMap {
  old: string;
  size: string;
  font: string;
}

// Size (sizing utility classes) is for post-icon components; font (font curve utilities) is for the rest (text content)
export const classesMap: Array<FontSizeClassMap> = [
  { old: 'font-size-12', size: 'w-12 h-12', font: 'fs-11' },
  { old: 'font-size-14', size: 'w-12 h-12', font: 'fs-9' },
  { old: 'font-size-16', size: 'w-16 h-16', font: 'fs-8' },
  { old: 'font-size-18', size: 'w-16 h-16', font: 'fs-6' },
  { old: 'font-size-20', size: 'w-24 h-24', font: 'fs-6' },
  { old: 'font-size-24', size: 'w-24 h-24', font: 'fs-5' },
  { old: 'font-size-28', size: 'w-32 h-32', font: 'fs-4' },
  { old: 'font-size-32', size: 'w-32 h-32', font: 'fs-3' },
  { old: 'font-size-40', size: 'w-40 h-40', font: 'fs-2' },
  { old: 'font-size-48', size: 'w-48 h-48', font: 'fs-1' },
  { old: 'font-size-56', size: 'w-56 h-56', font: 'fs-1' },
  { old: 'fs-tiny', size: 'w-12 h-12', font: 'fs-10' },
  { old: 'fs-small', size: 'w-16 h-16', font: 'fs-9' },
  { old: 'fs-regular', size: 'w-16 h-16', font: 'fs-8' },
  { old: 'fs-bigger-regular', size: 'w-16 h-16', font: 'fs-8' },
  { old: 'fs-medium', size: 'w-24 h-24', font: 'fs-6' },
  { old: 'fs-large', size: 'w-24 h-24', font: 'fs-6' },
  { old: 'fs-small-big', size: 'w-24 h-24', font: 'fs-5' },
  { old: 'fs-big', size: 'w-32 h-32', font: 'fs-4' },
  { old: 'fs-bigger-big', size: 'w-32 h-32', font: 'fs-3' },
  { old: 'fs-small-huge', size: 'w-40 h-40', font: 'fs-2' },
  { old: 'fs-huge', size: 'w-48 h-48', font: 'fs-1' },
];

function generateMessages(classesMap: Array<FontSizeClassMap>): Record<string, string> {
  return classesMap.reduce(
    (o, key) =>
      Object.assign(o, {
        [key.old]: `The "${key.old}" class has been deleted. Please remove it or replace it with either "${key.font}" for text elements or the sizing utilities "${key.size}" for icons.`,
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
        'Flags deprecated "fs-*" and "font-size-*" classes and replaces them with either font curves for text content or sizing utility classes for icons.',
    },
    messages: generateMessages(classesMap),
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
          const isIcon = node.name === 'post-icon';

          classesMap.forEach(classMap => {
            if ($node.hasClass(classMap.old)) {
              context.report({
                messageId: classMap.old,
                loc: node.loc,
                ...(classMap.font
                  ? {
                      fix(fixer) {
                        const fixedNode = $node
                          .removeClass(classMap.old)
                          .addClass(isIcon ? classMap.size : classMap.font);
                        return fixer.replaceTextRange(node.range, fixedNode.toString());
                      },
                    }
                  : {}),
              });
            }
          });
        }
      },
    };
  },
});
