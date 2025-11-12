import rule, { name, messageId } from '../../src/rules/stencil-no-unreflected-required-props';
import { RuleTester } from '@typescript-eslint/rule-tester';

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
