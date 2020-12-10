import { marginBottom, marginLeft, marginRight, marginTop } from '../margin'

jest.mock('../../../utils/tailwindUtils')

describe.each(
  [
    ['marginTop', marginTop],
    ['marginRight', marginRight],
    ['marginBottom', marginBottom],
    ['marginLeft', marginLeft],
  ],
)('%s', (name, generator) => {
  test(`generates ${name} property`, () => {
    expect(generator('0'))
      .toEqual({ [name]: '0px' })

    expect(generator('-0'))
      .toEqual({ [name]: '0px' })

    expect(generator('px'))
      .toEqual({ [name]: '1px' })

    expect(generator('-px'))
      .toEqual({ [name]: '-1px' })

    expect(generator('4'))
      .toEqual({ [name]: '1rem' })

    expect(generator('-4'))
      .toEqual({ [name]: '-1rem' })

    expect(generator('1.5'))
      .toEqual({ [name]: '0.375rem' })

    expect(generator('-1.5'))
      .toEqual({ [name]: '-0.375rem' })
  })

  test('uses value as raw css if it cant be resolved from tailwind', () => {
    expect(generator('10px'))
      .toEqual({ [name]: '10px' })

    expect(generator('-10px'))
      .toEqual({ [name]: '-10px' })
  })
})
