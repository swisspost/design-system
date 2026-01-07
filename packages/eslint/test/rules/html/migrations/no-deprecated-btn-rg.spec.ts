import rule, { name } from '../../../../src/rules/html/migrations/no-deprecated-btn-rg';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<button class="btn btn-sm">Click me</button>',
    },
    {
      code: '<button class="btn">Click me</button>',
    },
    {
      code: '<button [class.btn-sm]="hasSmallButton">Click me</button>',
    },
    {
      code: '<button [ngClass]="\'btn btn-sm\'">Click me</button>',
    },
    {
      code: '<button [ngClass]="`btn btn-sm`">Click me</button>',
    },
  ],
  invalid: [
    {
      code: '<button class="btn btn-rg">Click me</button>',
      output: '<button class="btn btn-sm">Click me</button>',
      errors: [{ messageId: 'btn-rg' }],
    },
    {
      code: '<button [class.btn-rg]="hasSmallButton">Click me</button>',
      output: '<button [class.btn-sm]="hasSmallButton">Click me</button>',
      errors: [{ messageId: 'btn-rg' }],
    },

    {
      code: '<button [ngClass]="\'btn btn-rg\'">Click me</button>',
      output: '<button [ngClass]="\'btn btn-sm\'">Click me</button>',
      errors: [{ messageId: 'btn-rg' }],
    },
    {
      code: '<button [ngClass]="`btn btn-rg`">Click me</button>',
      output: '<button [ngClass]="`btn btn-sm`">Click me</button>',
      errors: [{ messageId: 'btn-rg' }],
    },
    // {
    //   code: '<button [class]="btn btn-rg">Click me</button>',
    //   output: '<button [class]="btn btn-sm">Click me</button>',
    //   errors: [{ messageId: 'btn-rg' }],
    // },
  ],
});
