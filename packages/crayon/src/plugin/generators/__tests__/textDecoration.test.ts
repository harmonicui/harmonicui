import { textDecoration } from '../textDecoration'

jest.mock('../../../utils/tailwindUtils')

test('uses value as raw css', () => {
  expect(textDecoration('underline'))
    .toEqual({ textDecoration: 'underline' })

  expect(textDecoration('overline'))
    .toEqual({ textDecoration: 'overline' })

  expect(textDecoration('none'))
    .toEqual({ textDecoration: 'none' })
})
