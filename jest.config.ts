export default {
  bail: true,
  clearMocks: true,
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src/$1',
    '@app(.*)': '<rootDir>/src/app/src/$1',
    '@mechanisms(.*)': '<rootDir>/src/core/mechanisms/$1',
    '@middlewares(.*)': '<rootDir>/src/core/middlewares/$1',
    '@models(.*)': '<rootDir>/src/core/models/$1',
    '@repositories(.*)': '<rootDir>/src/core/repositories/$1',
    '@utilities(.*)': '<rootDir>/src/core/utilities/$1',
  },
  testEnvironment: 'node',
};
