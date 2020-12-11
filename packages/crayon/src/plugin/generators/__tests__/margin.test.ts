import { marginBottom, marginLeft, marginRight, marginTop, marginX, marginY } from '../margin'
import { Generator } from '../../../types'

jest.mock('../../../utils/tailwindUtils')

type Sides = 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'

const testValues = [
  ['0', '0px'],
  ['px', '1px'],
  ['4', '1rem'],
  ['-0', '0px'],
  ['-px', '-1px'],
  ['-4', '-1rem'],
  ['1.5', '0.375rem'],
  ['-1.5', '-0.375rem'],
]

const sides: Array<[Sides, Generator]> = [
  ['marginTop', marginTop],
  ['marginRight', marginRight],
  ['marginBottom', marginBottom],
  ['marginLeft', marginLeft],
]

describe.each(sides)('%s', (name, generator) => {
  test.each(testValues)(
    `generates ${name} property using tailwind values. input: %s, expected: %s`,
    (input, expectedResult) => {
      expect(generator(input))
        .toEqual({
          [name]: expectedResult,
        })
    })

  test('uses value as raw css if it cant be resolved from tailwind', () => {
    expect(generator('10px'))
      .toEqual({ [name]: '10px' })

    expect(generator('-10px'))
      .toEqual({ [name]: '-10px' })
  })
})

describe('marginX', () => {
  test.each(testValues)(
    'generates marginRight & marginLeft properties using tailwind values. input: %s, expected: %s',
    (input, expectedResult) => {
      expect(marginX(input))
        .toEqual({
          marginRight: expectedResult,
          marginLeft: expectedResult,
        })
    })

  test('uses value as raw css if it can not be resolved from tailwind', () => {
    expect(marginX('13px'))
      .toEqual({
        marginRight: '13px',
        marginLeft: '13px',
      })

    expect(marginX('-13px'))
      .toEqual({
        marginRight: '-13px',
        marginLeft: '-13px',
      })
  })
})

describe('marginY', () => {
  test.each(testValues)(
    'generates marginTop & marginBottom properties using tailwind values. input: %s, expected result: %s',
    (input, expectedResult) => {
      expect(marginY(input))
        .toEqual({
          marginTop: expectedResult,
          marginBottom: expectedResult,
        })
    })

  test('uses value as raw css if it can not be resolved from tailwind', () => {
    expect(marginY('13px'))
      .toEqual({
        marginTop: '13px',
        marginBottom: '13px',
      })

    expect(marginY('-13px'))
      .toEqual({
        marginTop: '-13px',
        marginBottom: '-13px',
      })
  })
})
