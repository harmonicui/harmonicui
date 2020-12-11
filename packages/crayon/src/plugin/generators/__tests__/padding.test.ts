import { paddingBottom, paddingLeft, paddingRight, paddingTop } from '../padding'
import { Generator } from '../../../types'

jest.mock('../../../utils/tailwindUtils')

type Sides = 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'

const testValues = [
  ['0', '0px'],
  ['px', '1px'],
  ['4', '1rem'],
  ['1.5', '0.375rem'],
]

const sides: Array<[Sides, Generator]> = [
  ['paddingTop', paddingTop],
  ['paddingRight', paddingRight],
  ['paddingBottom', paddingBottom],
  ['paddingLeft', paddingLeft],
]

describe.each(sides)('%s', (name, generator) => {
  test.each(testValues)(
    `generates ${name} property using tailwind values. input: %s, expected: %s`,
    (input, expected) => {
      expect(generator(input))
        .toEqual({
          [name]: expected,
        })
    })

  test('uses value as raw css if it cant be resolved from tailwind', () => {
    expect(generator('10px'))
      .toEqual({
        [name]: '10px',
      })
  })
})
