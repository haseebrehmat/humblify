module.exports = {
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/controllers/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@dto/(.*)$': '<rootDir>/dto/$1',
    '^@models/(.*)$': '<rootDir>/models/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
}
