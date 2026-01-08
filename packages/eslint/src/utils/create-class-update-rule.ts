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
            // Simple HTML class case
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
              const root = $node[0];

              if (root && 'attribs' in root && root.attribs) {
                const attribs = root.attribs as Record<string, string>;

                for (const attrName of Object.keys(attribs)) {
                  const attr = attrName.toLowerCase();

                  if (attr === `[class.${oldClass}]`) {
                    context.report({
                      loc: node.loc,
                      messageId,
                      fix(fixer) {
                        // ----- CASE 1: [class.foo] -----

                        const fixedAttrName = `[class.${newClass}]`;
                        $node.attr(fixedAttrName, $node.attr(attrName));
                        $node.removeAttr(`[class.${oldClass}]`);

                        return fixer.replaceTextRange(node.range, $node.toString());
                      },
                    });
                  } // ----- CASE 2: [ngClass] (string literal) -----
                  else if (attr === '[ngclass]' && $node.attr(attrName)?.includes(oldClass)) {
                    const rawValue = attribs[attrName].trim();

                    const isStringLiteral =
                      rawValue.length >= 2 &&
                      ['"', "'", '`'].includes(rawValue[0]) &&
                      rawValue[0] === rawValue.at(-1);

                    const isObjectLiteral = rawValue.startsWith('{') && rawValue.endsWith('}');

                    // value is a string literal
                    if (isStringLiteral) {
                      const quote = rawValue[0];
                      const inner = rawValue.slice(1, -1);
                      const parts = inner.split(/\s+/);
                      const newParts = parts.map(cls => (cls === oldClass ? newClass : cls));
                      const newValue = quote + newParts.join(' ') + quote;

                      const originalAttrName = '[ngClass]';

                      $node.attr(originalAttrName, newValue);

                      $node.removeAttr(attrName);

                      // report with fixer
                      context.report({
                        loc: node.loc,
                        messageId,
                        fix(fixer) {
                          return fixer.replaceTextRange(node.range, $node.toString());
                        },
                      });
                    }
                    // ----- CASE 3: [ngClass]  (object literal) -----
                    else if (isObjectLiteral) {
                      try {
                        // Simple object literal parsing
                        const objStr = $node
                          .attr(attrName)
                          ?.toString()
                          .replace(/(\w+)\s*:/g, '"$1":');

                        if (!objStr) return;
                        const parsedObj: Record<string, string> = JSON.parse(objStr);
                        console.log(parsedObj);
                        const newObj: Record<string, string> = {};
                        for (const key of Object.keys(parsedObj)) {
                          const newKey = config.mutations[key]?.[1] || key;
                          newObj[newKey] = parsedObj[key];
                        }
                        // Serialize back to Angular object literal style
                        const newObjStr = JSON.stringify(newObj).replace(/"(\w+)":/g, '$1:');
                        console.log('new', newObjStr);

                        const originalAttrName = '[ngClass]';
                        $node.attr(originalAttrName, newObjStr);

                        $node.removeAttr(attrName);
                      } catch {
                        // fallback: leave as is if parsing fails
                      }
                      context.report({
                        loc: node.loc,
                        messageId,
                        fix(fixer) {
                          return fixer.replaceTextRange(node.range, $node.toString());
                        },
                      });
                    }
                  }

                  // console.log('isObjectLiteral:', isObjectLiteral);
                  // const isArrayLiteral = rawValue.startsWith('[') && rawValue.endsWith(']');

                  // console.log('isArrayLiteral:', isArrayLiteral);

                  // let newAttrValue = attribs[attrName];
                  // // ----- CASE 2: [class] (string or array of strings) -----
                  // else if (attr === '[class]') {
                  //   // naive split on spaces
                  //   const parts = newAttrValue
                  //     .split(/\s+/)
                  //     .map(cls => config.mutations[cls]?.[1] || cls);
                  //   newAttrValue = parts.join(' ');
                  //   return fixer.replaceTextRange(
                  //     [node.range[0], node.range[1]],
                  //     node.raw.replace(attribs[attrName], newAttrValue),
                  //   );
                  // }
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
