import {
  HelperTextContext, HelperTextContextProvider, useHelperTextContext,
} from '../HelperTextContext'

test('creates a context for HelperTextContract', () => {
  expect(HelperTextContext).toHaveProperty('Provider')
  expect(HelperTextContext).toHaveProperty('consume')
})

test('exports alias utilities for using HelperTextContext', () => {
  expect(HelperTextContextProvider).toEqual(HelperTextContext.Provider)
  expect(useHelperTextContext).toEqual(HelperTextContext.consume)
})
