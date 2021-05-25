module.exports = function createJestConfig(rootDir, options) {
  return Object.assign(
    {},
    {
      rootDir,
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
      collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
    },
    options,
  )
}
