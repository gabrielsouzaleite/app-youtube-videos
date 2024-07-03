module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'ts'],
  rootDir: './bff',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};