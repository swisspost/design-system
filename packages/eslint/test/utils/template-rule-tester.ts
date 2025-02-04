import { RuleTester } from '@typescript-eslint/rule-tester';
import * as templateParser from '@parsers/template';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: templateParser,
  },
});

export const templateRuleTester = ruleTester;
