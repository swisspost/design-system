import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { Rule } from 'eslint';
import { generateReplacedClassMutations } from './generate-mutations';
import { generateReplacedClassMessages } from './generate-messages';
import { getDynamicClassType, getNewAttrValue } from './class-binding-helpers';

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

export interface PhaseConfigWrapper {
  description: string;
  classesMap: {
    old: string;
    new: string;
  }[];
}

type SinglePhaseRuleConfig<T> = RuleConfigBase & PhaseConfig<T>;
type SinglePhaseRuleConfigWrapper = RuleConfigBase & PhaseConfigWrapper;

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
            // Simple HTML class
            if ($node.hasClass(oldClass)) {
              context.report({
                messageId,
                loc: node.loc,
                fix(fixer) {
                  const fixedNode = $node.removeClass(oldClass);
                  if (newClass) fixedNode.addClass(newClass);

                  // Remove empty class attribute
                  if (!fixedNode.attr('class')?.trim()) fixedNode.removeAttr('class');

                  return fixer.replaceTextRange(node.range, fixedNode.toString());
                },
              });
              return;
            }

            // Skip if no newClass to replace - should be updated for deleted classes case
            if (!newClass?.trim()) return;

            const root = $node[0];
            if (!root || root.type !== 'tag') return;

            const attribs = root.attribs as Record<string, string>;

            for (const attrName of Object.keys(attribs)) {
              const value = $node.attr(attrName);

              const { isClassBinding, isNgClass, isClass } = getDynamicClassType(
                attrName,
                value,
                oldClass,
              );

              if (!isClassBinding && !isNgClass && !isClass) continue;

              context.report({
                loc: node.loc,
                messageId,
                fix(fixer) {
                  if (isClassBinding) {
                    const fixedAttrName = `[class.${newClass}]`;
                    const oldAttrValue = $node.attr(attrName);
                    if (!oldAttrValue) return null;

                    $node.attr(fixedAttrName, oldAttrValue);
                    $node.removeAttr(`[class.${oldClass}]`);

                    return fixer.replaceTextRange(node.range, $node.toString());
                  }

                  const raw = $node.attr(attrName)?.trim();
                  if (!raw) return null;

                  const newValue = getNewAttrValue($node, attrName, oldClass, newClass, raw);
                  if (newValue === null) return null;

                  const targetAttr = isNgClass ? '[ngClass]' : '[class]';
                  if (newValue === '') $node.removeAttr(targetAttr);
                  else $node.attr(targetAttr, newValue);

                  if (isNgClass && attrName !== targetAttr) $node.removeAttr(attrName);

                  return fixer.replaceTextRange(node.range, $node.toString());
                },
              });
            }
          });
        },
      };
    },
  });

export const createClassUpdateRuleWrapper = (config: SinglePhaseRuleConfigWrapper) => {
  const data = generateReplacedClassMutations(config.classesMap);
  const rule = createClassUpdateRule({
    name: config.name,
    description: config.description,
    messages: generateReplacedClassMessages(config.classesMap),
    mutations: data,
  });

  return { name: config.name, data, rule };
};
