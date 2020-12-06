import { TailwindCSSConfig, TailwindUtils } from '../../types'
import * as _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import escapeClassName from 'tailwindcss/lib/util/escapeClassName'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const resolveConfig = require('tailwindcss/resolveConfig')
const config: TailwindCSSConfig = resolveConfig({})

export const theme: TailwindUtils['theme'] = (path: string) => {
  return _.get(config, `theme.${path}`)
}

export const e: TailwindUtils['e'] = (className) => {
  return escapeClassName(className)
}

export const addComponents: TailwindUtils['addComponents'] = (components) => {
  console.log(components)
}

const tailwindUtils: TailwindUtils = {
  theme,
  e,
  addComponents,
}

export default tailwindUtils
