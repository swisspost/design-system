import rule, { name, messageId } from '../../src/rules/stencil-component-part-naming';
import { RuleTester } from '@typescript-eslint/rule-tester';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run(name, rule, {
  valid: [
    // Valid: part names prefixed with 'post-'
    `<div part="post-menu"></div>`,
    `<div part="post-tabs"></div>`,
    `<div part="post-tabs-content"></div>`,
    `<button part="post-accordion-button"></button>`,
    `<div part="post-accordion-body"></div>`,
  ],
  invalid: [
    {
      code: `<div part="menu"></div>`,
      errors: [{ messageId }],
    },
    {
      code: `<div part="tabs"></div>`,
      errors: [{ messageId }],
    },
    {
      code: `<div part="content"></div>`,
      errors: [{ messageId }],
    },
    {
      code: `<button part="button"></button>`,
      errors: [{ messageId }],
    },
  ],
});
