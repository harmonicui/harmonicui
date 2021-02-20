import { InputContext, InputContextProvider, useInputContext } from '../InputContext'

test('creates a context for InputContract', () => {
  expect(InputContext).toHaveProperty('Provider')
  expect(InputContext).toHaveProperty('consume')
})

test('exports alias utilities for using InputContext', () => {
  expect(InputContextProvider).toEqual(InputContext.Provider)
  expect(useInputContext).toEqual(InputContext.consume)
})
