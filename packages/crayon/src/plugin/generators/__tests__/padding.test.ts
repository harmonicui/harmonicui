import { paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY } from '../padding'
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

describe('paddingX', () => {
  test.each(testValues)(
    'generates paddingRight & paddingLeft properties using tailwind values. input: %s, expected: %s',
    (input, expected) => {
      expect(paddingX(input))
        .toEqual({
          paddingRight: expected,
          paddingLeft: expected,
        })
    })

  test('uses value as raw css if it can not be resolved from tailwind', () => {
    expect(paddingX('18rem'))
      .toEqual({
        paddingRight: '18rem',
        paddingLeft: '18rem',
      })
  })
})

describe('paddingY', () => {
  test.each(testValues)(
    'generates paddingTop & paddingBottom properties using tailwind values. input: %s, expected: %s',
    (input, expected) => {
      expect(paddingY(input))
        .toEqual({
          paddingTop: expected,
          paddingBottom: expected,
        })
    })

  test('uses value as raw css if it can not be resolved from tailwind', () => {
    expect(paddingY('18rem'))
      .toEqual({
        paddingTop: '18rem',
        paddingBottom: '18rem',
      })
  })
})
