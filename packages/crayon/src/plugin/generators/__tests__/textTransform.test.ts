import { textTransform } from '../textTransform'

jest.mock('../../../utils/tailwindUtils')

test('uses value as raw css', () => {
  expect(textTransform('capitalize'))
    .toEqual({ textTransform: 'capitalize' })

  expect(textTransform('uppercase'))
    .toEqual({ textTransform: 'uppercase' })

  expect(textTransform('none'))
    .toEqual({ textTransform: 'none' })
})
