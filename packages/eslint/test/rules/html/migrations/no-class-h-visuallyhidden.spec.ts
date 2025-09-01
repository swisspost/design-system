import rule, { name } from '../../../../src/rules/html/migrations/no-class-h-visuallyhidden';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<div class="visually-hidden">Invisible text</div>',
    },
  ],
  invalid: [
    {
      code: '<div class="h-visuallyhidden">Invisible text</div>',
      output: '<div class="visually-hidden">Invisible text</div>',
      errors: [{ messageId: 'noClassHVisuallyhidden' }],
    },
  ],
});
