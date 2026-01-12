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
                ...(newClass
                  ? {
                      fix(fixer) {
                        const fixedNode = $node.removeClass(oldClass).addClass(newClass);
                        return fixer.replaceTextRange(node.range, fixedNode.toString());
                      },
                    }
                  : {}),
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
                          $node.attr(fixedAttrName, $node.attr(attrName));
                          $node.removeAttr(`[class.${oldClass}]`);

                          return fixer.replaceTextRange(node.range, $node.toString());
                        }

                        // ----- [ngClass] -----
                        if (isNgClass || isClass) {
                          const rawValue = attribs[attrName].trim();

                          const isStringLiteral =
                            rawValue.length >= 2 &&
                            ['"', "'", '`'].includes(rawValue[0]) &&
                            rawValue[0] === rawValue.at(-1);

                          const isObjectLiteral =
                            rawValue.startsWith('{') && rawValue.endsWith('}');

                          let newValue: string | null = null;

                          // ----- String literal -----
                          if (isStringLiteral) {
                            const quote = rawValue[0];
                            const inner = rawValue.slice(1, -1);
                            const parts = inner.split(/\s+/);
                            const newParts = parts.map(cls => (cls === oldClass ? newClass : cls));
                            newValue = quote + newParts.join(' ') + quote;
                          }
                          // ----- Object literal ----- (does not identify cases of double quote syntax e.g. {"key-1":"btn-1"})
                          else if (isObjectLiteral) {
                            const raw = $node
                              .attr(attrName)
                              ?.toString()
                              .replace(/['"\s]/g, '');

                            if (!raw) return null;

                            const inner = raw.slice(1, -1);
                            const parts = inner.split(',');
                            const classes = parts.map(p => p.split(':')[0]);

                            if (!classes.includes(oldClass)) return null;

                            const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                            newValue =
                              $node
                                .attr(attrName)
                                ?.toString()
                                .replace(
                                  new RegExp(`(?<![\\w-])${escapedOldClass}(?![\\w-])`, 'g'),
                                  newClass,
                                ) ?? null;
                          }

                          // Apply the changes if we have a new value
                          if (newValue) {
                            const originalAttrName = isNgClass ? '[ngClass]' : '[class]';
                            $node.attr(originalAttrName, newValue);
                            if (isNgClass) $node.removeAttr(attrName);

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
