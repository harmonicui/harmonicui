import resolveGenerator from '../resolveGenerator'
import * as generators from '../generators'
import { Generator } from '../../types'

jest.mock('../../utils/tailwindUtils')

const generatorsList: Array<[keyof typeof generators, Generator]> = [
  ['backgroundColor', generators.backgroundColor],
  ['color', generators.color],
  ['height', generators.height],
  ['letterSpacing', generators.letterSpacing],
  ['marginTop', generators.marginTop],
  ['marginRight', generators.marginRight],
  ['marginBottom', generators.marginBottom],
  ['marginLeft', generators.marginLeft],
  ['marginX', generators.marginX],
  ['marginY', generators.marginY],
  ['paddingTop', generators.paddingTop],
  ['paddingRight', generators.paddingRight],
  ['paddingBottom', generators.paddingBottom],
  ['paddingLeft', generators.paddingLeft],
  ['width', generators.width],
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
