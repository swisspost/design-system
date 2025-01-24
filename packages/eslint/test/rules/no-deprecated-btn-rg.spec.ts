import rule, { name } from '../../src/rules/no-deprecated-btn-rg';
import { templateRuleTester } from '../template-rule-tester';

templateRuleTester.run(name, rule, {
  valid: [
    {
      code: '<button class="btn btn-sm">Click me</button>',
    },
    {
      code: '<button class="btn">Click me</button>',
    },
  ],
  invalid: [
    {
      code: '<button class="btn btn-rg">Click me</button>',
      output: '<button class="btn btn-sm">Click me</button>',
      errors: [{ messageId: 'deprecatedBtnRg' }],
    },
  ],
});
