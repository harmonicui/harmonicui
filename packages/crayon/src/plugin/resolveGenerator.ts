import * as generators from './generators'
import { Generator } from '../types'

export default function resolveGenerator (generator: string): Generator {
  if (!generatorExists(generator)) {
    throw Error(`Error: Generator ${generator} not found.`)
  }

  return generators[generator]
}

function generatorExists (generator: string): generator is keyof typeof generators {
  return generator in generators
}
