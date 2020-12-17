import resolveGenerator from '../resolveGenerator'
import * as generators from '../generators'
import { Generator } from '../../types'

jest.mock('../../utils/tailwindUtils')

const generatorsList: Array<[keyof typeof generators, Generator]> = [
  ['backgroundColor', generators.backgroundColor],
  ['boxSizing', generators.boxSizing],
  ['clear', generators.clear],
  ['color', generators.color],
  ['display', generators.display],
  ['float', generators.float],
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
  ['textAlign', generators.textAlign],
  ['textDecoration', generators.textDecoration],
  ['textTransform', generators.textTransform],
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
