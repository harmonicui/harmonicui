import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

export const letterSpacing: Generator = (value) => {
  return {
    letterSpacing: resolveThemeValue(`letterSpacing.${value}`, value),
  }
}
