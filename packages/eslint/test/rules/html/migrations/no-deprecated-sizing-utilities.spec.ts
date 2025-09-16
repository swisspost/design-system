import { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import {
  rulePhase1,
  namePhase1,
  rulePhase2,
  namePhase2,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-sizing-utilities';
import { htmlRuleTester } from '../../../utils/html-rule-tester';
import { RuleDocs } from '../../../../src/utils/create-rule';

function runTests(
  name: string,
  rule: RuleModule<string, [], RuleDocs, RuleListener>,
  data: Record<string, [string, string]>,
) {
  // Generate all of the invalid use cases
  const invalidData = Object.entries(data).map(([key, [oldClass, newClass]]) => ({
    code: `<div class="${oldClass}">Content</div>`,
    output: `<div class="${newClass}">Content</div>`,
    errors: [{ messageId: key }],
  }));

  htmlRuleTester.run(name, rule, {
    valid: [
      {
        code: '<div class="w-sm-16">Content</div>',
      },
      {
        code: '<div class="h-md-48">Content</div>',
      },
      {
        code: '<div class="h-md-three-quarters">Content</div>',
      },
    ],
    invalid: invalidData,
  });
}

runTests(namePhase1, rulePhase1, data.mutationsPhase1);
runTests(namePhase2, rulePhase2, data.mutationsPhase2);
