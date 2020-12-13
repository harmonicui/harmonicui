import { display } from '../display'

jest.mock('../../../utils/tailwindUtils')

test('uses value as raw css', () => {
  expect(display('block'))
    .toEqual({ display: 'block' })

  expect(display('inline-block'))
    .toEqual({ display: 'inline-block' })
})
