import rule, {
  name,
  messageId,
} from '../../../../src/rules/html/migrations/no-deprecated-h-visuallyhidden';
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
      errors: [{ messageId }],
    },
  ],
});
