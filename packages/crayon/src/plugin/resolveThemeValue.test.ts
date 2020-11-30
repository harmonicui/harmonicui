import resolveThemeValue from './resolveThemeValue'

jest.mock('./tailwindUtils')

test('returns requested value from tailwind config', () => {
  expect(resolveThemeValue('backgroundColor.blue.500', ''))
    .toEqual('#3b82f6')
})

test('returns the defaultValue if value cannot be resolved from tailwind config', () => {
  expect(resolveThemeValue('backgroundColor.blue.500', 'some-value'))
    .toEqual('#3b82f6')

  expect(resolveThemeValue('unresolvable.value', 'some-value'))
    .toEqual('some-value')
})

test('returns the defaultValue if the resolved value in not an string', () => {
  expect(resolveThemeValue('backgroundColor.blue.500', 'some-value'))
    .toEqual('#3b82f6')

  expect(resolveThemeValue('backgroundColor.blue', 'some-value'))
    .toEqual('some-value')
})
