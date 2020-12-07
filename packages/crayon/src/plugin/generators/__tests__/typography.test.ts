import { color, letterSpacing } from '../typography'

jest.mock('../../../utils/tailwindUtils')

describe('color', () => {
  test('generates color property with tailwind values', () => {
    expect(color('blue-500'))
      .toEqual({ color: '#3b82f6' })

    expect(color('transparent'))
      .toEqual({ color: 'transparent' })

    expect(color('current'))
      .toEqual({ color: 'currentColor' })
  })

  test('uses value as raw css if it cant be resolved from tailwind', () => {
    expect(color('#10b981'))
      .toEqual({ color: '#10b981' })
  })
})

describe('letterSpacing', () => {
  test('generates letterSpacing property with tailwind values', () => {
    expect(letterSpacing('normal'))
      .toEqual({ letterSpacing: '0em' })

    expect(letterSpacing('wider'))
      .toEqual({ letterSpacing: '0.05em' })
  })

  test('uses value as raw css if it cant be resolved from tailwind', () => {
    expect(letterSpacing('1em'))
      .toEqual({ letterSpacing: '1em' })
  })
})
