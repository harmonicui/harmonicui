import { paddingBottom, paddingLeft, paddingRight, paddingTop } from '../padding'

jest.mock('../../../utils/tailwindUtils')

describe.each(
  [
    ['paddingTop', paddingTop],
    ['paddingRight', paddingRight],
    ['paddingBottom', paddingBottom],
    ['paddingLeft', paddingLeft],
  ],
)('%s', (name, generator) => {
  test(`generates ${name} property`, () => {
    expect(generator('4'))
      .toEqual({
        [name]: '1rem',
      })
  })

  test('uses value as raw css if it cant be resolved from tailwind', () => {
    expect(generator('10px'))
      .toEqual({
        [name]: '10px',
      })
  })
})
