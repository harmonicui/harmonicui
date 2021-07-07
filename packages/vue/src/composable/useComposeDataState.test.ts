import { useComposeDataState } from './useComposeDataState'

test('composes the data-state attribute containing key of each truthy value', () => {
  expect(
    useComposeDataState({
      invalid: false,
      optional: true,
      disabled: true,
    }),
  ).toEqual('optional disabled')
})

test('value should be undefined if result is empty', () => {
  expect(useComposeDataState({ invalid: false })).toEqual(undefined)
})
