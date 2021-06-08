import {
  SwitchToggleContext,
  SwitchToggleContextKey,
  useSwitchToggleContext,
  provideSwitchToggleContext,
} from './SwitchToggleContext'

test('creates a context for SwitchToggleContract', () => {
  expect(SwitchToggleContext).toHaveProperty('provide')
  expect(SwitchToggleContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof SwitchToggleContext.key).toEqual('symbol')
})

test('exports alias utilities for using SwitchToggleContext', () => {
  expect(provideSwitchToggleContext).toEqual(SwitchToggleContext.provide)
  expect(useSwitchToggleContext).toEqual(SwitchToggleContext.consume)
  expect(SwitchToggleContextKey).toEqual(SwitchToggleContext.key)
})
