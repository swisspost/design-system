import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { Rule } from 'eslint';

type RuleType = Rule.RuleMetaData['type'];

export interface RuleConfigBase {
  name: string;
  type?: RuleType;
}

export interface PhaseConfig<T> {
  description: string;
  messages: T;
  mutations: Record<keyof T, [string, string]>;
}

type SinglePhaseRuleConfig<T> = RuleConfigBase & PhaseConfig<T>;

export const createClassUpdateRule = <T extends Record<string, string>>(
  config: SinglePhaseRuleConfig<T>,
) =>
  createRule({
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
                ...(newClass
                  ? {
                      fix(fixer) {
                        const fixedNode = $node.removeClass(oldClass).addClass(newClass);
                        return fixer.replaceTextRange(node.range, fixedNode.toString());
                      },
                    }
                  : {}),
              });
            }
          });
        },
      };
    },
  });
