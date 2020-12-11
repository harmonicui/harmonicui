import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

type Sides = 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'

export const paddingTop: Generator = (value) => {
  return paddingSide(value, 'paddingTop')
}

export const paddingRight: Generator = (value) => {
  return paddingSide(value, 'paddingRight')
}

export const paddingBottom: Generator = (value) => {
  return paddingSide(value, 'paddingBottom')
}

export const paddingLeft: Generator = (value) => {
  return paddingSide(value, 'paddingLeft')
}

export const paddingX: Generator = (value) => {
  return {
    ...paddingSide(value, 'paddingRight'),
    ...paddingSide(value, 'paddingLeft'),
  }
}

function paddingSide (value: string, side: Sides) {
  return {
    [side]: resolveThemeValue(`padding[${value}]`, value),
  }
}
