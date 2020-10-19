module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '.example.'
  ],
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    // '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx)'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  }
}

// https://www.nerd.vision/post/testing-a-typescript-project-with-jest-ts-jest
