import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

export const width: Generator = (value) => {
  return {
    width: resolveThemeValue(`width[${value}]`, value),
  }
}
