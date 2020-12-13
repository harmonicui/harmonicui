import { Generator } from '../../types'

const aliases = {
  border: 'border-box',
  content: 'content-box',
}

export const boxSizing: Generator = (value) => {
  if (isAnAlias(value)) {
    value = aliases[value]
  }

  return {
    boxSizing: value,
  }
}

function isAnAlias (value: string): value is keyof typeof aliases {
  return value in aliases
}
