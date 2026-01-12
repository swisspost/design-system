import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { Rule } from 'eslint';
import { generateReplacedClassMutations } from './generate-mutations';
import { generateReplacedClassMessages } from './generate-messages';

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
                  const fixedNode = $node.removeClass(oldClass).addClass(newClass);

                  // Remove empty class attribute
                  const classValue = fixedNode.attr('class');
                  if (!classValue || classValue.trim() === '') {
                    fixedNode.removeAttr('class');
                  }

                  return fixer.replaceTextRange(node.range, fixedNode.toString());
                },
              });
            } else {
              // Angular dynamic class binding
              const root = $node[0];

              if (root && 'attribs' in root && root.attribs) {
                const attribs = root.attribs as Record<string, string>;

                for (const attrName of Object.keys(attribs)) {
                  const escaped = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  const validClassRegex = new RegExp(
                    `(^|[^A-Za-z0-9_-])${escaped}([^A-Za-z0-9_-]|$)`,
                  );
                  const value = $node.attr(attrName);
                  const hasExactClass = typeof value === 'string' && validClassRegex.test(value);

                  const isClassBinding = attrName === `[class.${oldClass}]`;
                  const isNgClass = attrName.toLowerCase() === '[ngclass]' && hasExactClass;
                  const isClass = attrName.toLowerCase() === '[class]' && hasExactClass;

                  if (isClassBinding || isNgClass || isClass) {
                    context.report({
                      loc: node.loc,
                      messageId,
                      fix(fixer) {
                        // ----- [class.foo] -----
                        if (isClassBinding) {
                          const fixedAttrName = `[class.${newClass}]`;
                          const oldAttrValue = $node.attr(attrName);
                          if (oldAttrValue != null) {
                            $node.attr(fixedAttrName, oldAttrValue);
                            $node.removeAttr(`[class.${oldClass}]`);
                            return fixer.replaceTextRange(node.range, $node.toString());
                          }
                          return null;
                        }

                        // ----- [ngClass] or [class] -----
                        if (isNgClass || isClass) {
                          const attrValue = attribs[attrName]?.trim();
                          if (!attrValue) return null;

                          const firstChar = attrValue[0];
                          const lastChar = attrValue.at(-1);

                          const isStringLiteral =
                            ['"', "'", '`'].includes(firstChar) && firstChar === lastChar;
                          const isObjectLiteral =
                            attrValue.startsWith('{') && attrValue.endsWith('}');

                          let newValue: string | null = null;

                          if (isStringLiteral) {
                            const inner = attrValue.slice(1, -1);
                            const parts = inner.split(/\s+/);
                            const updatedParts = parts.map(cls =>
                              cls === oldClass ? newClass : cls,
                            );
                            newValue = firstChar + updatedParts.join(' ') + firstChar;
                          } else if (isObjectLiteral) {
                            const rawAttr = $node.attr(attrName)?.toString();
                            if (!rawAttr) return null;

                            // Remove quotes and spaces to safely inspect keys
                            const sanitized = rawAttr.replace(/['"\s]/g, '');
                            const inner = sanitized.slice(1, -1);
                            const keys = inner.split(',').map(p => p.split(':')[0]);
                            if (!keys.includes(oldClass)) return null;

                            const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                            newValue =
                              rawAttr.replace(
                                new RegExp(`(?<![\\w-])${escapedOldClass}(?![\\w-])`, 'g'),
                                newClass,
                              ) ?? null;
                          }

                          if (newValue) {
                            const targetAttr = isNgClass ? '[ngClass]' : '[class]';
                            $node.attr(targetAttr, newValue);
                            if (isNgClass && attrName !== targetAttr) $node.removeAttr(attrName);
                            return fixer.replaceTextRange(node.range, $node.toString());
                          }
                        }

                        return null;
                      },
                    });
                  }
                }
              }
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
