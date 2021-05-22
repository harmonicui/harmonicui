import {
  TextFieldInputContext,
  TextFieldInputContextKey,
  useTextFieldInputContext,
  provideTextFieldInputContext,
} from './TextFieldInputContext'

test('creates a context for TextFieldInputContract', () => {
  expect(TextFieldInputContext).toHaveProperty('provide')
  expect(TextFieldInputContext).toHaveProperty('consume')
})

test('exposes the context key', () => {
  expect(typeof TextFieldInputContext.key).toEqual('symbol')
})

test('exports alias utilities for using TextFieldInputContext', () => {
  expect(provideTextFieldInputContext).toEqual(TextFieldInputContext.provide)
  expect(useTextFieldInputContext).toEqual(TextFieldInputContext.consume)
  expect(TextFieldInputContextKey).toEqual(TextFieldInputContext.key)
})
