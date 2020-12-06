import { height } from '../height'

jest.mock('../../../utils/tailwindUtils')

test('generates height property with tailwind values', () => {
  expect(height('4'))
    .toEqual({ height: '1rem' })

  expect(height('2.5'))
    .toEqual({ height: '0.625rem' })

  expect(height('1/2'))
    .toEqual({ height: '50%' })

  expect(height('full'))
    .toEqual({ height: '100%' })

  expect(height('auto'))
    .toEqual({ height: 'auto' })

  expect(height('px'))
    .toEqual({ height: '1px' })

  expect(height('screen'))
    .toEqual({ height: '100vh' })
})

test('uses value as raw css if it cant be resolved from tailwind', () => {
  expect(height('34px'))
    .toEqual({ height: '34px' })
})
