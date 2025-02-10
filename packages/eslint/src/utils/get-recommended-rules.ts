import type { ESLintUtils } from '@typescript-eslint/utils';
import { RuleDocs } from './create-rule';

export const getRecommendedRules = (
  pluginName: string,
  rules: Record<string, ESLintUtils.RuleModule<string, [], RuleDocs>>,
) => {
  const recommendedRules: Record<string, 'error'> = {};

  Object.entries(rules).forEach(([ruleName, rule]) => {
    if (rule.meta.docs?.recommended) recommendedRules[`${pluginName}/${ruleName}`] = 'error';
  });

  return recommendedRules;
};
