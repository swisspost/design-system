module.exports = {
  extends: ['plugin:@stencil-community/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json',
  },
  rules: {
    '@stencil-community/element-type': 1,
    // Needed for DropdownElement
    '@stencil/decorators-context': 0,
    // This is a broken rule with eslint 8 (https://github.com/stencil-community/stencil-eslint/issues/60)
    '@stencil/own-methods-must-be-private': 0,
    // Seems to be buggy as well
    '@stencil/async-methods': 0,
    // Also buggy
    '@stencil/no-unused-watch': 0,
    // Buggy
    'react/jsx-no-bind': 0,
    // No performance problem anymore https://medium.com/@ryanflorence/react-inline-functions-and-performance-bdff784f5578
  },
};
