module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'scss'],
  transform: {
    '\\.scss$': './tests/jest-scss-transformer',
  },
  testMatch: ['**/tests/**/*.test.scss'],
};
