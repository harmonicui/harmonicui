import resolveGenerator from '../resolveGenerator'
import * as generators from '../generators'
import { Generator } from '../../types'

jest.mock('../tailwindUtils')

const generatorsList: Array<[keyof typeof generators, Generator]> = [
  ['backgroundColor', generators.backgroundColor],
  ['paddingTop', generators.paddingTop],
  ['paddingRight', generators.paddingRight],
  ['paddingBottom', generators.paddingBottom],
  ['paddingLeft', generators.paddingLeft],
]

test.each(generatorsList)('resolves the "%s" generator', (name, generator) => {
  expect(resolveGenerator(name))
    .toEqual(generator)
})

test('throws an error if generator does not exists', () => {
  const generator = 'invalid-generator'

  expect(() => {
    resolveGenerator(generator)
  }).toThrowError(`Error: Generator ${generator} not found.`)
})
