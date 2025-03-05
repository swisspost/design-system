import { RuleTester } from '@typescript-eslint/rule-tester';
import { htmlParser } from '../../src/parsers/html';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: htmlParser,
  },
});

export const htmlRuleTester = ruleTester;
