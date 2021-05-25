import { TextFieldInputContext, TextFieldInputContextProvider, useTextFieldInputContext } from './TextFieldInputContext'

test('creates a context for InputContract', () => {
  expect(TextFieldInputContext).toHaveProperty('Provider')
  expect(TextFieldInputContext).toHaveProperty('consume')
})

test('exports alias utilities for using InputContext', () => {
  expect(TextFieldInputContextProvider).toEqual(TextFieldInputContext.Provider)
  expect(useTextFieldInputContext).toEqual(TextFieldInputContext.consume)
})
