import { RuleTester } from '@typescript-eslint/rule-tester';
import templateParser from '../src/template-parser';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: templateParser,
  },
});

export const templateRuleTester = ruleTester;
