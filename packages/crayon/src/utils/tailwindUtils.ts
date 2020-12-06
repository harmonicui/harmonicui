import { TailwindUtils } from '../types'

let utils: TailwindUtils

export function storeTailwindUtils (tailwindUtils: TailwindUtils): void {
  utils = tailwindUtils
}

export const theme: TailwindUtils['theme'] = (path, defaultValue) => {
  if (utils) {
    return utils.theme(path, defaultValue)
  }
  throw new Error('Error: unable to access tailwind utilities.')
}

const addComponents: TailwindUtils['addComponents'] = (components, options) => {
  if (utils) {
    return utils.addComponents(components, options)
  }
  throw new Error('Error: unable to access tailwind utilities.')
}

export const e: TailwindUtils['e'] = (className) => {
  if (utils) {
    return utils.e(className)
  }
  throw new Error('Error: unable to access tailwind utilities.')
}

const tailwindUtils: TailwindUtils = {
  addComponents,
  theme,
  e,
}

export default tailwindUtils
