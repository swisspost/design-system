import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';

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
 */
export const createResponsiveClassUpdateRule = (config: ResponsiveRuleConfig) => {
  const messages: Record<string, string> = {};
  const mutations: Record<string, [string, string[]]> = {};

  config.classesMap.forEach((mapping, index) => {
    const key = `responsiveSpacing_${index}`;
    const newClassesStr = mapping.new.join(' ');

    messages[key] = mapping.needsReview
      ? `The "${mapping.old}" class is deprecated. Please replace it with "${newClassesStr}". ⚠️ This is not a 1:1 migration — review the output carefully.`
      : `The "${mapping.old}" class is deprecated. Please replace it with "${newClassesStr}".`;

    mutations[key] = [mapping.old, mapping.new];
  });

  const data: ResponsiveClassUpdateData = { mutations };

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
          // with one combined fix to avoid ESLint discarding overlapping fixes.
          const matches: Array<{ messageId: string; oldClass: string; newClasses: string[] }> = [];

          Object.entries(mutations).forEach(([messageId, [oldClass, newClasses]]) => {
            if ($node.hasClass(oldClass)) {
              matches.push({ messageId, oldClass, newClasses });
            }
          });

          if (matches.length === 0) return;

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
        },
      };
    },
  });

  return { rule, data };
};