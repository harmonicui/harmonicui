/* eslint-disable */
import { TailwindUtils } from '../types'

export const theme: TailwindUtils['theme'] = (path, defaultValue) => {
  return undefined
}

const addComponents: TailwindUtils['addComponents'] = (components, options) => {
  console.log()
}

export const e: TailwindUtils['e'] = (className) => {
  return className
}

const tailwindUtils: TailwindUtils = {
  addComponents,
  theme,
  e,
}

export default tailwindUtils
