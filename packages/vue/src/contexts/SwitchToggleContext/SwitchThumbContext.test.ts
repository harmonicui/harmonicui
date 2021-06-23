import {
  SwitchThumbContext,
  SwitchThumbContextKey,
  useSwitchThumbContext,
  provideSwitchThumbContext,
} from './SwitchThumbContext'

test('creates a context for SwitchThumbContract', () => {
  expect(SwitchThumbContext).toHaveProperty('provide')
  expect(SwitchThumbContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof SwitchThumbContext.key).toEqual('symbol')
})

test('exports alias utilities for using SwitchThumbContext', () => {
  expect(provideSwitchThumbContext).toEqual(SwitchThumbContext.provide)
  expect(useSwitchThumbContext).toEqual(SwitchThumbContext.consume)
  expect(SwitchThumbContextKey).toEqual(SwitchThumbContext.key)
})
