import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

export const height: Generator = (value) => {
  return {
    height: resolveThemeValue(`height[${value}]`, value),
  }
}
