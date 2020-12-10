import { letterSpacing } from '../letterSpacing'

jest.mock('../../../utils/tailwindUtils')

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
