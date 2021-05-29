import {
  CheckBoxInputContext,
  CheckBoxInputContextKey,
  useCheckBoxInputContext,
  provideCheckBoxInputContext,
} from './CheckBoxInputContext'

test('creates a context for CheckBoxInputContract', () => {
  expect(CheckBoxInputContext).toHaveProperty('provide')
  expect(CheckBoxInputContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof CheckBoxInputContext.key).toEqual('symbol')
})

test('exports alias utilities for using CheckBoxInputContext', () => {
  expect(provideCheckBoxInputContext).toEqual(CheckBoxInputContext.provide)
  expect(useCheckBoxInputContext).toEqual(CheckBoxInputContext.consume)
  expect(CheckBoxInputContextKey).toEqual(CheckBoxInputContext.key)
})
