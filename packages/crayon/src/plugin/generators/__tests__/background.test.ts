import { backgroundColor } from '../background'

jest.mock('../../../utils/tailwindUtils')

describe('backgroundColor', () => {
  test('generates backgroundColor property', () => {
    expect(backgroundColor('blue-500'))
      .toEqual({
        backgroundColor: '#3b82f6',
      })
  })

  test('uses value as raw css if it cant be resolved from tailwind', () => {
    expect(backgroundColor('#10b981'))
      .toEqual({
        backgroundColor: '#10b981',
      })
  })
})
