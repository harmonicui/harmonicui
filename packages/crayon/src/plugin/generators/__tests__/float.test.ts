import { float } from '../float'

jest.mock('../../../utils/tailwindUtils')

test('generates float css property', () => {
  expect(float('right'))
    .toEqual({ float: 'right' })

  expect(float('left'))
    .toEqual({ float: 'left' })

  expect(float('none'))
    .toEqual({ float: 'none' })

  expect(float('inline-start'))
    .toEqual({ float: 'inline-start' })

  expect(float('inline-end'))
    .toEqual({ float: 'inline-end' })
})
