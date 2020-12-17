import { fontWeight } from '../fontWeight'

jest.mock('../../../utils/tailwindUtils')

test('generates fontWeight property', () => {
  expect(fontWeight('thin'))
    .toEqual({
      fontWeight: '100',
    })

  expect(fontWeight('extralight'))
    .toEqual({
      fontWeight: '200',
    })

  expect(fontWeight('light'))
    .toEqual({
      fontWeight: '300',
    })

  expect(fontWeight('normal'))
    .toEqual({
      fontWeight: '400',
    })

  expect(fontWeight('medium'))
    .toEqual({
      fontWeight: '500',
    })

  expect(fontWeight('bold'))
    .toEqual({
      fontWeight: '700',
    })
})

test('uses value as raw css if it cant be resolved from tailwind', () => {
  expect(fontWeight('inherit'))
    .toEqual({
      fontWeight: 'inherit',
    })

  expect(fontWeight('initial'))
    .toEqual({
      fontWeight: 'initial',
    })

  expect(fontWeight('100'))
    .toEqual({
      fontWeight: '100',
    })
})
