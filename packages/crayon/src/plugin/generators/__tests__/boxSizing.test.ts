import { boxSizing } from '../boxSizing'

jest.mock('../../../utils/tailwindUtils')

test('generates boxSizing property using alias values', () => {
  expect(boxSizing('border'))
    .toEqual({ boxSizing: 'border-box' })

  expect(boxSizing('content'))
    .toEqual({ boxSizing: 'content-box' })
})

test('uses value as raw css if does not match aliases', () => {
  expect(boxSizing('border-box'))
    .toEqual({ boxSizing: 'border-box' })

  expect(boxSizing('content-box'))
    .toEqual({ boxSizing: 'content-box' })
})
