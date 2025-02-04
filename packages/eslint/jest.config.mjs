import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' with { type: "json" };

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths,
    { prefix: '<rootDir>/' }
  )
};
