import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { Rule } from 'eslint';
import { generateReplacedClassMutations } from './generate-mutations';
import { generateReplacedClassMessages } from './generate-messages';
import { getDynamicClassType, getNewAttrValue } from './class-binding-helpers';
import { removeEmptyAttrs } from './empty-attrs-remover';

type RuleType = Rule.RuleMetaData['type'];

export interface RuleConfigBase {
  name: string;
  type?: RuleType;
}

export interface PhaseConfig<T> {
  description: string;
  messages: T;
  /**
   * Tuple of [oldClass, newClass, manualOnly?].
   * When `manualOnly` is `true` the rule reports the violation but provides no autofix,
   * because applying the fix would create a chain collision with another migration rule.
   * Users must migrate these classes by hand.
   */
  mutations: Record<keyof T, [string, string, boolean?]>;
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

          Object.entries(config.mutations).forEach(([messageId, [oldClass, newClass, manualOnly]]) => {
            // Simple HTML class
            if ($node.hasClass(oldClass)) {
              context.report({
                messageId,
                loc: node.loc,
                // Manual-only mutations must not provide a fixer: applying the fix would
                // create a chain collision with another migration rule (e.g. rg→sm then sm→xs).
                // Users must migrate these classes by hand.
                ...(manualOnly
                  ? {}
                  : {
                      fix(fixer) {
                        const fixedNode = $node.removeClass(oldClass);
                        if (newClass) fixedNode.addClass(newClass);

                        // Remove empty class attribute
                        if (!fixedNode.attr('class')?.trim()) fixedNode.removeAttr('class');

                        const fixedHtml = removeEmptyAttrs($node.toString(), context, node);
                        return fixer.replaceTextRange(node.range, fixedHtml);
                      },
                    }),
              });
              return;
            }

            // Skip if no newClass to replace - should be updated for deleted classes case
            if (!newClass?.trim()) return;

            // Manual-only mutations are not auto-fixed in dynamic bindings either
            if (manualOnly) return;

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

                    const fixedHtml = removeEmptyAttrs($node.toString(), context, node);
                    return fixer.replaceTextRange(node.range, fixedHtml);
                  }

                  const raw = $node.attr(attrName)?.trim();
                  if (!raw) return null;

                  const newValue = getNewAttrValue($node, attrName, oldClass, newClass, raw);
                  if (newValue === null) return null;

                  const targetAttr = attrName;

                  if (newValue === '') $node.removeAttr(targetAttr);
                  else $node.attr(targetAttr, newValue);

                  if (isNgClass && attrName !== targetAttr) $node.removeAttr(attrName);

                  const fixedHtml = removeEmptyAttrs($node.toString(), context, node);
                  return fixer.replaceTextRange(node.range, fixedHtml);
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