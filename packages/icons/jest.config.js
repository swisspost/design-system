/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setup-env.js'],
  moduleNameMapper: {
    '^node-fetch$': '<rootDir>/tests/__mocks__/node-fetch.js',
  },
};
