import { ESLintUtils } from '@typescript-eslint/utils';

export interface RuleDocs {
  dir: 'html' | 'html/migrations' | 'ts' | 'ts/migrations';
  recommended?: boolean;
}

/**
 * We need to patch the RuleCreator in order to use the directory from the meta.docs object in the URL.
 */
const patchedRuleCreator = (
  urlCreator: (ruleName: string, ruleDirectory: string) => string,
): ReturnType<typeof ESLintUtils.RuleCreator<RuleDocs>> => {
  return function createRule({ name, meta, defaultOptions, create }) {
    return {
      meta: {
        ...meta,
        docs: {
          ...meta.docs,
          url: urlCreator(name, meta.docs.dir),
        },
      },
      defaultOptions,
      create(context) {
        const optionsWithDefault = ESLintUtils.applyDefault(defaultOptions, context.options);
        return create(context, optionsWithDefault);
      },
    };
  };
};

patchedRuleCreator.withoutDocs = ESLintUtils.RuleCreator.withoutDocs;

export const createRule = patchedRuleCreator(
  (ruleName: string, ruleDirectory: string) =>
    `https://github.com/swisspost/design-system/blob/main/packages/eslint/docs/rules/${ruleDirectory}/${ruleName}.md`,
);
