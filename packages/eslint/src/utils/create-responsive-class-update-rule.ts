import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { getDynamicClassType, isStringLiteral, updateStringLiteral } from './class-binding-helpers';

export interface ResponsiveClassMapping {
  old: string;
  new: string[];
  needsReview?: boolean;
}

export interface ResponsiveClassUpdateData {
  mutations: Record<string, [string, string[]]>;
}

interface ResponsiveRuleConfig {
  name: string;
  description: string;
  classesMap: ResponsiveClassMapping[];
}

/**
 * Creates an ESLint rule that replaces a single deprecated class with multiple new classes.
 * Unlike `createClassUpdateRule`, mutations map [oldClass, newClasses[]] (one-to-many).
 * No two-phase approach is needed since the old `-r` suffix classes never collide with new names.
 *
 * Dynamic binding behaviour:
 * - `[class.old]` and object-literal `[ngClass]`/`[class]` are flagged without autofix
 * - String-literal `[ngClass]`/`[class]` are auto-fixed inline
 */
export const createResponsiveClassUpdateRule = (config: ResponsiveRuleConfig) => {
  const messages: Record<string, string> = {};
  const mutations: Record<string, [string, string[]]> = {};

  config.classesMap.forEach(mapping => {
    const key = mapping.old;
    const newClassesStr = mapping.new.join(' ');

    messages[key] = mapping.needsReview
      ? `The "${mapping.old}" class is deprecated. Please replace it with "${newClassesStr}". ⚠️ This is not a 1:1 migration — review the output carefully.`
      : `The "${mapping.old}" class is deprecated. Please replace it with "${newClassesStr}".`;

    mutations[key] = [mapping.old, mapping.new];
  });

  const data: ResponsiveClassUpdateData = { mutations };

  const handleDynamicBindings = (
    $node: any,
    node: HtmlNode,
    attribs: Record<string, string>,
    context: any,
  ) => {
    for (const [messageId, [oldClass, newClasses]] of Object.entries(mutations)) {
      const newClassesStr = newClasses.join(' ');

      for (const attrName of Object.keys(attribs)) {
        const value = $node.attr(attrName);
        const { isClassBinding, isNgClass, isClass } = getDynamicClassType(
          attrName,
          value,
          oldClass,
        );

        if (!isClassBinding && !isNgClass && !isClass) continue;

        if (isClassBinding) {
          context.report({ messageId, loc: node.loc });
          continue;
        }

        if ((isNgClass || isClass) && value && isStringLiteral(value)) {
          context.report({
            messageId,
            loc: node.loc,
            fix(fixer) {
              const newValue = updateStringLiteral(value, oldClass, newClassesStr);
              const targetAttr = isNgClass ? '[ngClass]' : '[class]';

              if (newValue === '') $node.removeAttr(targetAttr);
              else $node.attr(targetAttr, newValue);

              if (isNgClass && attrName !== targetAttr) $node.removeAttr(attrName);

              return fixer.replaceTextRange(node.range, $node.toString());
            },
          });
          continue;
        }

        context.report({ messageId, loc: node.loc });
      }
    }
  };

  const rule = createRule({
    name: config.name,
    meta: {
      docs: {
        dir: 'html',
        description: config.description,
      },
      messages,
      type: 'problem',
      fixable: 'code',
      schema: [],
    },
    defaultOptions: [],
    create(context) {
      return {
        tag(node: HtmlNode) {
          const $node = node.toCheerio();

          // Collect all matching deprecated classes first, then emit a single report
          // with one combined fix to avoid ESLint discarding overlapping fixes
          const matches: Array<{ messageId: string; oldClass: string; newClasses: string[] }> = [];

          Object.entries(mutations).forEach(([messageId, [oldClass, newClasses]]) => {
            if ($node.hasClass(oldClass)) {
              matches.push({ messageId, oldClass, newClasses });
            }
          });

          if (matches.length > 0) {
            context.report({
              messageId: matches[0].messageId,
              loc: node.loc,
              fix(fixer) {
                const fixedNode = $node.clone();
                matches.forEach(({ oldClass, newClasses }) => {
                  fixedNode.removeClass(oldClass);
                  newClasses.forEach(cls => fixedNode.addClass(cls));
                });

                // Remove empty class attribute
                if (!fixedNode.attr('class')?.trim()) fixedNode.removeAttr('class');

                return fixer.replaceTextRange(node.range, fixedNode.toString());
              },
            });

            // Plain `class` attribute handled above — skip dynamic-binding pass
            return;
          }

          const root = $node[0];
          if (!root || root.type !== 'tag') return;

          const attribs = root.attribs as Record<string, string>;
          handleDynamicBindings($node, node, attribs, context);
        },
      };
    },
  });

  return { rule, data };
};
