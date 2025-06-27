import rule, { name } from '../../src/rules/stencil-strict-props-initialization';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils'; // Import AST_NODE_TYPES

const ruleTester = new RuleTester();

ruleTester.run(name, rule, {
  valid: [
    //Code examples that should NOT trigger the rule
    `
    class MyComponent {
      @Prop() myProp?:string;
    }
    `,
    `
    class MyComponent {
      @Prop() myProp!:string;
    }
    `,
    // Valid case for a property with an initial value
    `
    class MyComponent {
      @Prop() myProp = 'initial value';
    }
    `,
  ],
  invalid: [
    {
      // Code that SHOULD trigger the rule
      code: `
        class MyComponent {
          @Prop() myProp: string; // Not optional, not definitely assigned, no initial value
        }
      `,
      errors: [
        {
          messageId: 'propStrictInit',
          type: AST_NODE_TYPES.PropertyDefinition, // The AST node type the rule checks (PropertyDefinition for class properties)
          line: 3,
          column: 11,
        },
      ],
    },
  ],
});
