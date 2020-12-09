// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactPlugin = require('vite-plugin-react')

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  plugins: [reactPlugin],
}

module.exports = config
