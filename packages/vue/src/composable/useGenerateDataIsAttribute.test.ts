import { useGenerateDataIsAttribute } from './useGenerateDataIsAttribute'

test('generates data-is attribute containing key of each truthy value', () => {
  expect(
    useGenerateDataIsAttribute({
      invalid: false,
      optional: true,
      disabled: true,
    }),
  ).toEqual({ 'data-is': 'optional disabled' })
})

test('value should be undefined if result is empty', () => {
  expect(useGenerateDataIsAttribute({ invalid: false })).toEqual({
    'data-is': undefined,
  })
})
