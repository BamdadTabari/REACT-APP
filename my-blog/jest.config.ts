import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'

    }
  },
  setupFilesAfterEnv: ['./src/setupTests.ts']
};

export default config;
