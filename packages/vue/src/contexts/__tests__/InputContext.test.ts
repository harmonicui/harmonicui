import { InputContext, provideInputContext, useInputContext } from '../InputContext'

test('creates a context for InputContract', () => {
  expect(InputContext).toHaveProperty('provide')
  expect(InputContext).toHaveProperty('consume')
})

test('exports alias utilities for using InputContext', () => {
  expect(provideInputContext).toEqual(InputContext.provide)
  expect(useInputContext).toEqual(InputContext.consume)
})
