import type { ESLintUtils } from '@typescript-eslint/utils';

export const getAllRules = (
  pluginName: string,
  rules: Record<string, ESLintUtils.RuleModule<string>>,
) => {
  const allRules: Record<string, 'error'> = {};

  Object.keys(rules).forEach(ruleName => {
    allRules[`${pluginName}/${ruleName}`] = 'error';
  });

  return allRules;
};
