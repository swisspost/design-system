import { RuleTester } from '@typescript-eslint/rule-tester';
import rule, { messageId, name } from '../../src/rules/stencil-no-unreflected-required-props';

const ruleTester = new RuleTester();

ruleTester.run(name, rule, {
  valid: [
    `
    class MyComponent {
      @Prop({ reflect: true }) readonly myProp!: string;
    }
    `,
    `
    class MyComponent {
      @Required()
      @OneOf(['a', 'b'])
      @Prop({ reflect: true })
        readonly myProp!: string;
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
