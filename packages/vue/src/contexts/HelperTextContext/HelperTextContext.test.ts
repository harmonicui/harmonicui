import {
  HelperTextContext,
  HelperTextContextKey,
  provideHelperTextContext,
  useHelperTextContext,
} from './HelperTextContext'

test('creates a context for HelperTextContract', () => {
  expect(HelperTextContext).toHaveProperty('provide')
  expect(HelperTextContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof HelperTextContext.key).toEqual('symbol')
})

test('exports alias utilities for using HelperTextContext', () => {
  expect(provideHelperTextContext).toEqual(HelperTextContext.provide)
  expect(useHelperTextContext).toEqual(HelperTextContext.consume)
  expect(HelperTextContextKey).toEqual(HelperTextContext.key)
})
