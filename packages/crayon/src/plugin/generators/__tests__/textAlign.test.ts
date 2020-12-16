import { textAlign } from '../textAlign'

jest.mock('../../../utils/tailwindUtils')

test('uses value as raw css', () => {
  expect(textAlign('center'))
    .toEqual({ textAlign: 'center' })

  expect(textAlign('left'))
    .toEqual({ textAlign: 'left' })

  expect(textAlign('inherit'))
    .toEqual({ textAlign: 'inherit' })

  expect(textAlign('start'))
    .toEqual({ textAlign: 'start' })
})
