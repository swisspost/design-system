import rule, { name } from '../../../../src/rules/html/migrations/no-deprecated-css-classes';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<div class="other-class">Click me</div>',
    },
    {
      code: '<div>Click me</div>',
    },
  ],
  invalid: [
    {
      code: '<div class="card-group text-primary bg-yellow container-reset">Click me</div>',
      output: '<div>Click me</div>',
      errors: [{ messageId: 'css-classes' }],
    },
  ],
});
