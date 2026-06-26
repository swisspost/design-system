module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/tests/setup-tests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@root/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'esnext',
          moduleResolution: 'bundler',
          isolatedModules: true,
          types: ['node', 'jest'],
        },
        diagnostics: {
          ignoreCodes: [5107],
        },
      },
    ],
  },
};
