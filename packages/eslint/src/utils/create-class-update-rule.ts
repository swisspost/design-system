import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { Rule } from 'eslint';

interface RuleConfig<T>{
  name: string;
  description: string;
  messages: T;
  mutations: Record<keyof T, [string] | [string, string]>;
  type?: Rule.RuleMetaData['type'];
}

export const createClassUpdateRule = <T extends Record<string, string>>(
  config: RuleConfig<T>
) => createRule({
  name: config.name,
  meta: {
    docs: {
      dir: 'html',
      description: config.description,
    },
    messages: config.messages,
    type: config.type || 'problem',
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      tag(node: HtmlNode) {
        const $node = node.toCheerio();

        Object.entries(config.mutations).forEach(([messageId, [oldClass, newClass]]) => {
          if ($node.hasClass(oldClass)) {
            context.report({
              messageId,
              loc: node.loc,
              ... newClass ? {
                fix(fixer) {
                  const fixedNode = $node.removeClass(oldClass).addClass(newClass);
                  return fixer.replaceTextRange(node.range, fixedNode.toString());
                }
              } : {},
            });
          }
        });
      },
    };
  },
});
