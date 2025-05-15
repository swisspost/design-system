// import rule, { name } from '../../src/rules/stencil-strict-props-initialization';
// import { RuleTester } from 'eslint';

// const ruleTester = new RuleTester({
//   // Specify parser options needed for your rule (e.g., ecmaVersion, sourceType, jsx)
//   parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
// });

// ruleTester.run('your-custom-rule', rule, {
//   valid: [
//     // Code examples that should NOT trigger the rule
//     '@Prop() myOptionalProp?:string',
//     '@Prop() myRequiProp?:string',
//   ],
//   invalid: [
//     {
//       code: "const invalidCode = 'world';", // Code that SHOULD trigger the rule
//       errors: [
//         {
//           message: "Expected 'hello', but got 'world'.", // The exact message your rule reports
//           type: 'VariableDeclaration', // The AST node type your rule checks
//           line: 1,
//           column: 7, // Starting column of the violation
//           // If your rule has a fix:
//           // output: "const invalidCode = 'hello';"
//         },
//       ],
//     },
//     // More invalid code examples...
//   ],
// });
