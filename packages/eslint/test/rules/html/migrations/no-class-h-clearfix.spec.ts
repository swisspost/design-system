import rule, { name } from '../../../../src/rules/html/migrations/no-class-h-clearfix';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<div class="clearfix">Content</div>',
    },
  ],
  invalid: [
    {
      code: '<div class="h-clearfix">Content</div>',
      output: '<div class="clearfix">Content</div>',
      errors: [{ messageId: 'noClassHClearfix' }],
    },
  ],
});
