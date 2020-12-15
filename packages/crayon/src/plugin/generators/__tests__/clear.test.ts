import { clear } from '../clear'

jest.mock('../../../utils/tailwindUtils')

test('generates clear css property', () => {
  expect(clear('right'))
    .toEqual({ clear: 'right' })

  expect(clear('left'))
    .toEqual({ clear: 'left' })

  expect(clear('both'))
    .toEqual({ clear: 'both' })

  expect(clear('none'))
    .toEqual({ clear: 'none' })

  expect(clear('inline-start'))
    .toEqual({ clear: 'inline-start' })

  expect(clear('inline-end'))
    .toEqual({ clear: 'inline-end' })
})
