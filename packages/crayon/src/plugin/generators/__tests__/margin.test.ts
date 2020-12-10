import { marginBottom, marginLeft, marginRight, marginTop, marginX } from '../margin'

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

describe('marginX', () => {
  test('generates marginRight and marginLeft properties property with tailwind values', () => {
    expect(marginX('0'))
      .toEqual({
        marginRight: '0px',
        marginLeft: '0px',
      })

    expect(marginX('-0'))
      .toEqual({
        marginRight: '0px',
        marginLeft: '0px',
      })

    expect(marginX('px'))
      .toEqual({
        marginRight: '1px',
        marginLeft: '1px',
      })

    expect(marginX('-px'))
      .toEqual({
        marginRight: '-1px',
        marginLeft: '-1px',
      })

    expect(marginX('4'))
      .toEqual({
        marginRight: '1rem',
        marginLeft: '1rem',
      })

    expect(marginX('-4'))
      .toEqual({
        marginRight: '-1rem',
        marginLeft: '-1rem',
      })

    expect(marginX('1.5'))
      .toEqual({
        marginRight: '0.375rem',
        marginLeft: '0.375rem',
      })

    expect(marginX('-1.5'))
      .toEqual({
        marginRight: '-0.375rem',
        marginLeft: '-0.375rem',
      })
  })

  test('uses value as raw css if it can not be resolved from tailwind', () => {
    expect(marginX('13px'))
      .toEqual({
        marginRight: '13px',
        marginLeft: '13px',
      })

    expect(marginX('-13px'))
      .toEqual({
        marginRight: '-13px',
        marginLeft: '-13px',
      })
  })
})
