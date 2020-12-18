import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

export const fontWeight: Generator = (value) => {
  const path = `fontWeight.${value}`

  return {
    fontWeight: resolveThemeValue(path, value),
  }
}
