import rule, { name, messageId } from '../../src/rules/stencil-no-unreflected-required-props';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils'; // Import AST_NODE_TYPES

const ruleTester = new RuleTester();

ruleTester.run(name, rule, {
  valid: [
    `
    class MyComponent {
      @Prop({ reflect: true }) readonly myProp!: string;
    }
    `,
  ],
  invalid: [
    {
      code: `
        class MyComponent {
          @Prop() readonly myProp!: string;
        }
      `,
      errors: [{ messageId }],
    },
  ],
});
