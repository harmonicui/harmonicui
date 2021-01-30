// eslint-disable-next-line @typescript-eslint/no-var-requires
const createJestConfig = require('../../test-utils/createJestConfig')

module.exports = createJestConfig(__dirname, {
  displayName: 'vue',
  setupFilesAfterEnv: ['./src/test-utils/matchers/index.ts'],
})
