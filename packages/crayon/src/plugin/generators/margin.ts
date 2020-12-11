import { Generator } from '../../types'
import resolveThemeValue from '../resolveThemeValue'

type Sides = 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft'

export const marginTop: Generator = (value) => {
  return marginSide(value, 'marginTop')
}

export const marginRight: Generator = (value) => {
  return marginSide(value, 'marginRight')
}

export const marginBottom: Generator = (value) => {
  return marginSide(value, 'marginBottom')
}

export const marginLeft: Generator = (value) => {
  return marginSide(value, 'marginLeft')
}

export const marginX: Generator = (value) => {
  return {
    ...marginSide(value, 'marginRight'),
    ...marginSide(value, 'marginLeft'),
  }
}

export const marginY: Generator = (value) => {
  return {
    ...marginSide(value, 'marginTop'),
    ...marginSide(value, 'marginBottom'),
  }
}

function marginSide (value: string, side: Sides) {
  return {
    [side]: resolveThemeValue(`margin[${value}]`, value),
  }
}
