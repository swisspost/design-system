import rule, { name } from '../../../../src/rules/html/migrations/no-deprecated-btn-rg';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

const ERROR = [{ messageId: 'btn-rg' }];
const BINDINGS = ['ngClass', 'class'];

htmlRuleTester.run(name, rule, {
  valid: [
    { code: '<button class="btn btn-sm">Click me</button>' },
    { code: '<button class="btn">Click me</button>' },
    { code: '<button [class.btn-sm]="hasSmallButton">Click me</button>' },
    { code: '<button [class.btn-rg-sm]="hasSmallButton">Click me</button>' },
    // Generate valid cases for both [ngClass] and [class]
    ...BINDINGS.flatMap(attr => [
      { code: `<button [${attr}]="'btn btn-sm'">Click me</button>` },
      { code: `<button [${attr}]="\`btn btn-sm\`">Click me</button>` },
      { code: `<button [${attr}]="\`btn btn-rg-sm\`">Click me</button>` },
      { code: `<button [${attr}]="{'btn-sm': true, 'other-key': false}">Click me</button>` },
      { code: `<button [${attr}]="{btn-sm: true, otherKey: false}">Click me</button>` },
      {
        code: `<button [${attr}]="{ 
          'btn-sm': true,
          'other-key': false
        }">Click me</button>`,
      },
      { code: `<button [${attr}]="{btn-rg-sm: true, otherKey: false}">Click me</button>` },
    ]),
  ],
  invalid: [
    {
      code: '<button class="btn btn-rg">Click me</button>',
      output: '<button class="btn btn-sm">Click me</button>',
      errors: ERROR,
    },
    {
      code: '<button [class.btn-rg]="hasSmallButton">Click me</button>',
      output: '<button [class.btn-sm]="hasSmallButton">Click me</button>',
      errors: ERROR,
    },
    // Generate invalid cases for both [ngClass] and [class]
    ...BINDINGS.flatMap(attr => [
      {
        code: `<button [${attr}]="'btn btn-rg'">Click me</button>`,
        output: `<button [${attr}]="'btn btn-sm'">Click me</button>`,
        errors: ERROR,
      },
      {
        code: `<button [${attr}]="\`btn btn-rg\`">Click me</button>`,
        output: `<button [${attr}]="\`btn btn-sm\`">Click me</button>`,
        errors: ERROR,
      },
      {
        code: `<button [${attr}]="{btn-rg: true, otherKey: false}">Click me</button>`,
        output: `<button [${attr}]="{btn-sm: true, otherKey: false}">Click me</button>`,
        errors: ERROR,
      },
      {
        code: `<button [${attr}]="{'btn-rg': true, 'other-key': false}">Click me</button>`,
        output: `<button [${attr}]="{'btn-sm': true, 'other-key': false}">Click me</button>`,
        errors: ERROR,
      },

      {
        code: `<button [${attr}]="{
                'btn-rg': true,
                'other-key': false
              }">Click me</button>`,
        output: `<button [${attr}]="{
                'btn-sm': true,
                'other-key': false
              }">Click me</button>`,
        errors: ERROR,
      },
    ]),
  ],
});
