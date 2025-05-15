import type { TSESLint } from '@typescript-eslint/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stencilStrictPropsInitializationRule from '../../rules/stencil-strict-props-initialization';

// Define the recommended Stencil configuration
const stencilRecommendedConfig = (
  stencilPlugin: TSESLint.FlatConfig.Plugin,
  parser: TSESLint.FlatConfig.Parser,
): TSESLint.FlatConfig.Config => ({
  name: '@swisspost/design-system-eslint/stencil/recommended',
  files: ['**/*.{ts,tsx}'], // Apply to TypeScript and TSX files
  languageOptions: {
    parser, // Use the provided parser (likely typescript-eslint)
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    '@swisspost/design-system-eslint': stencilPlugin,
  },
  rules: {
    '@swisspost/design-system-eslint/stencil-strict-props-initialization': 'error',
  },
});

export default stencilRecommendedConfig;
