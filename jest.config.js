module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    './dist/',
    './public/'
  ],
  modulePathIgnorePatterns: ['node_modules', 'jest-test-results.json'],
  collectCoverageFrom: [
    '<rootDir>/src/*.ts',
  ],
  moduleNameMapper: { '^@providers': '<rootDir>/src/providers' },
  transform: { '^.+\\.(js|ts)$': 'babel-jest' },
  testEnvironment: 'node',
  verbose: true,
}
