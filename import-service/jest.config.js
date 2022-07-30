/* eslint-disable */
module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  resetMocks: true,
  collectCoverage: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/.serverless/',
    '/.webpack/',
    '/node_modules/',
    '/src/types/',
  ],
  testMatch: ['**/__tests__/**/*.test.ts'],
  roots: ['<rootDir>'],
  modulePaths: ['src'],
};
