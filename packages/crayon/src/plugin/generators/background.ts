import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

export const backgroundColor: Generator = (value) => {
  const path = `backgroundColor.${value.split('-').join('.')}`

  return {
    backgroundColor: resolveThemeValue(path, value),
  }
}
