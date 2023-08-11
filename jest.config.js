/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    '<rootDir>/application/jest.config.js',
    '<rootDir>/infrastructure/memory-repository/jest.config.js',
    '<rootDir>/infrastructure/nest-api/jest.config.js',
    '<rootDir>/infrastructure/next-web/jest.config.js',
  ],
};
