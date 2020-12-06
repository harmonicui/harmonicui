import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

export const color: Generator = (value) => {
  const path = `textColor.${value.split('-').join('.')}`

  return {
    color: resolveThemeValue(path, value),
  }
}
