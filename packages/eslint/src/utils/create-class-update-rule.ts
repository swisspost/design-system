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

                  if (
                    (isClassBinding || isNgClass || isClass) &&
                    (newClass || newClass.trim() !== '')
                  ) {
                    context.report({
                      loc: node.loc,
                      messageId,
                      fix(fixer) {
                        // [class.foo]
                        if (isClassBinding) return fixClassBinding();

                        // [ngClass] or [class]
                        if (isNgClass || isClass) return fixNgClassOrClass();

                        return null;

                        function fixClassBinding() {
                          const fixedAttrName = `[class.${newClass}]`;
                          const oldAttrValue = $node.attr(attrName);
                          if (oldAttrValue == null) return null;

                          $node.attr(fixedAttrName, oldAttrValue);
                          $node.removeAttr(`[class.${oldClass}]`);
                          return fixer.replaceTextRange(node.range, $node.toString());
                        }

                        function fixNgClassOrClass() {
                          const raw = attribs[attrName]?.trim();
                          if (!raw) return null;

                          const newValue = getNewAttrValue(raw);
                          if (!newValue) return null;

                          const targetAttr = isNgClass ? '[ngClass]' : '[class]';
                          $node.attr(targetAttr, newValue);
                          if (isNgClass && attrName !== targetAttr) $node.removeAttr(attrName);

                          return fixer.replaceTextRange(node.range, $node.toString());
                        }

                        function getNewAttrValue(value: string): string | null {
                          if (isStringLiteral(value)) return updateStringLiteral(value);
                          if (isObjectLiteral(value))
                            return updateObjectLiteral($node.attr(attrName)?.toString() ?? '');
                          return null;
                        }

                        function isStringLiteral(value: string): boolean {
                          const first = value[0],
                            last = value.at(-1);
                          return ['"', "'", '`'].includes(first) && first === last;
                        }

                        function isObjectLiteral(value: string): boolean {
                          return value.startsWith('{') && value.endsWith('}');
                        }

                        function updateStringLiteral(value: string): string {
                          const quote = value[0];
                          const inner = value.slice(1, -1);
                          const parts = inner
                            .split(/\s+/)
                            .map(cls => (cls === oldClass ? newClass : cls));
                          return quote + parts.join(' ') + quote;
                        }

                        function updateObjectLiteral(rawAttr: string): string | null {
                          const sanitized = rawAttr.replace(/['"\s]/g, '');
                          const inner = sanitized.slice(1, -1);
                          const keys = inner.split(',').map(p => p.split(':')[0]);
                          if (!keys.includes(oldClass)) return null;

                          const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                          return rawAttr.replace(
                            new RegExp(`(?<![\\w-])${escapedOldClass}(?![\\w-])`, 'g'),
                            newClass,
                          );
                        }
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
