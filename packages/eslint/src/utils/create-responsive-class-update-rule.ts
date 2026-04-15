import { createRule } from './create-rule';
import { HtmlNode } from '../parsers/html/html-node';
import { getDynamicClassType, getNewAttrValueMulti } from './class-binding-helpers';

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
 * This is used for responsive spacing utilities where one old class expands to several
 * breakpoint-specific pixel classes (e.g. `m-tiny-r` → `m-12 m-md-16`).
 *
 * Unlike `createClassUpdateRule`, mutations here map [oldClass, newClasses[]] (one-to-many).
 * No two-phase approach is needed since the old `-r` suffix classes never collide with new names.
 *
 * Handles static `class="..."` attributes as well as Angular dynamic bindings:
 * `[class.old]`, `[ngClass]`, and `[class]`.
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

          // ── Static class="..." ────────────────────────────────────────────
          // Collect all matching deprecated classes on this node first,
          // then emit a single report with one combined fix to avoid
          // ESLint discarding overlapping fixes for the same node range.
          const staticMatches: Array<{
            messageId: string;
            oldClass: string;
            newClasses: string[];
          }> = [];

          Object.entries(mutations).forEach(([messageId, [oldClass, newClasses]]) => {
            if ($node.hasClass(oldClass)) {
              staticMatches.push({ messageId, oldClass, newClasses });
            }
          });

          if (staticMatches.length > 0) {
            // Report on the first match (ESLint requires a messageId),
            // but the fix handles all matched classes in one pass.
            context.report({
              messageId: staticMatches[0].messageId,
              loc: node.loc,
              fix(fixer) {
                const fixedNode = $node.clone();

                staticMatches.forEach(({ oldClass, newClasses }) => {
                  fixedNode.removeClass(oldClass);
                  newClasses.forEach(cls => fixedNode.addClass(cls));
                });

                // Remove empty class attribute
                if (!fixedNode.attr('class')?.trim()) fixedNode.removeAttr('class');

                return fixer.replaceTextRange(node.range, fixedNode.toString());
              },
            });

            // Static class handled — skip dynamic binding checks for this node.
            return;
          }

          // ── Angular dynamic bindings ──────────────────────────────────────
          const root = $node[0];
          if (!root || root.type !== 'tag') return;

          const attribs = root.attribs as Record<string, string>;

          for (const attrName of Object.keys(attribs)) {
            const value = $node.attr(attrName);

            Object.entries(mutations).forEach(([messageId, [oldClass, newClasses]]) => {
              const { isClassBinding, isNgClass, isClass } = getDynamicClassType(
                attrName,
                value,
                oldClass,
              );

              if (!isClassBinding && !isNgClass && !isClass) return;

              context.report({
                messageId,
                loc: node.loc,
                fix(fixer) {
                  // [class.old]="expr" → [class.new1]="expr" [class.new2]="expr" ...
                  // Since one binding cannot expand to multiple bindings directly,
                  // we add each new class binding and remove the old one.
                  if (isClassBinding) {
                    const oldAttrValue = $node.attr(attrName);
                    if (!oldAttrValue) return null;

                    newClasses.forEach(cls => $node.attr(`[class.${cls}]`, oldAttrValue));
                    $node.removeAttr(`[class.${oldClass}]`);

                    return fixer.replaceTextRange(node.range, $node.toString());
                  }

                  const raw = $node.attr(attrName)?.trim();
                  if (!raw) return null;

                  const newValue = getNewAttrValueMulti($node, attrName, oldClass, newClasses, raw);
                  if (newValue === null) return null;

                  const targetAttr = isNgClass ? '[ngClass]' : '[class]';
                  if (newValue === '') $node.removeAttr(targetAttr);
                  else $node.attr(targetAttr, newValue);

                  if (isNgClass && attrName !== targetAttr) $node.removeAttr(attrName);

                  return fixer.replaceTextRange(node.range, $node.toString());
                },
              });
            });
          }
        },
      };
    },
  });

  return { rule, data };
};