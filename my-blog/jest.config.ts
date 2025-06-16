import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './tsconfig.test.json'
    }
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  setupFilesAfterEnv: ['./src/setupTests.ts']
};

export default config;
