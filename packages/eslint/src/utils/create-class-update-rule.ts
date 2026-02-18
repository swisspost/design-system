import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { Rule } from 'eslint';
import { generateReplacedClassMutations } from './generate-mutations';
import { generateReplacedClassMessages } from './generate-messages';
import type { AnyNode } from 'domhandler';
import type { Cheerio } from 'cheerio';

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

// Determine type of dynamic class attribute
function getDynamicClassType(
  attrName: string,
  value: string | undefined,
  oldClass: string,
): { isClassBinding: boolean; isNgClass: boolean; isClass: boolean } {
  const escaped = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|[^A-Za-z0-9_-])${escaped}([^A-Za-z0-9_-]|$)`);
  const hasExactClass = typeof value === 'string' && regex.test(value);

  return {
    isClassBinding: attrName === `[class.${oldClass}]`,
    isNgClass: attrName.toLowerCase() === '[ngclass]' && hasExactClass,
    isClass: attrName.toLowerCase() === '[class]' && hasExactClass,
  };
}

function getNewAttrValue(
  $node: Cheerio<AnyNode>,
  attrName: string,
  oldClass: string,
  newClass: string,
  value: string,
): string | null {
  if (isStringLiteral(value)) return updateStringLiteral(value, oldClass, newClass);
  if (isObjectLiteral(value)) {
    const rawAttr = $node.attr(attrName);
    if (!rawAttr) return null;
    return updateObjectLiteral(rawAttr, oldClass, newClass);
  }
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

function updateStringLiteral(value: string, oldClass: string, newClass: string): string {
  const quote = value[0];
  const inner = value.slice(1, -1);
  const parts = inner
    .split(/\s+/)
    .map(cls => (cls === oldClass ? newClass : cls))
    .filter(Boolean); // remove empty strings if deleting class
  return parts.length ? quote + parts.join(' ') + quote : '';
}

function updateObjectLiteral(rawAttr: string, oldClass: string, newClass: string): string | null {
  const sanitized = rawAttr.replace(/['"\s]/g, '');
  const inner = sanitized.slice(1, -1);
  const keys = inner.split(',').map(p => p.split(':')[0]);
  if (!keys.includes(oldClass)) return null;

  const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return rawAttr.replace(
    new RegExp(`(?<![\\w-])${escapedOldClass}(?![\\w-])`, 'g'),
    newClass ?? '',
  );
}

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
