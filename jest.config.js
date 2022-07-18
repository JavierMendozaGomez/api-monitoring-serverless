module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/stacks/__tests__'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
