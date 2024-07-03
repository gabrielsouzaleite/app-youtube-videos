module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'ts'],
  rootDir: '.',
  roots: ['<rootDir>/bff', '<rootDir>/web'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};