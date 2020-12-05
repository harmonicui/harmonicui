import { width } from '../width'

jest.mock('../../../utils/tailwindUtils')

test('generates width property with tailwind values', () => {
  expect(width('4'))
    .toEqual({ width: '1rem' })

  expect(width('2.5'))
    .toEqual({ width: '0.625rem' })

  expect(width('1/2'))
    .toEqual({ width: '50%' })

  expect(width('full'))
    .toEqual({ width: '100%' })

  expect(width('auto'))
    .toEqual({ width: 'auto' })

  expect(width('px'))
    .toEqual({ width: '1px' })

  expect(width('screen'))
    .toEqual({ width: '100vw' })

  expect(width('max'))
    .toEqual({ width: 'max-content' })
})

test('uses value as raw css if it cant be resolved from tailwind', () => {
  expect(width('17px'))
    .toEqual({ width: '17px' })
})
