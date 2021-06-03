import {
  CheckBoxInputContext,
  CheckBoxInputContextProvider,
  useCheckBoxInputContext,
} from './CheckBoxInputContext'

test('creates a context for InputContract', () => {
  expect(CheckBoxInputContext).toHaveProperty('Provider')
  expect(CheckBoxInputContext).toHaveProperty('consume')
})

test('exports alias utilities for using InputContext', () => {
  expect(CheckBoxInputContextProvider).toEqual(CheckBoxInputContext.Provider)
  expect(useCheckBoxInputContext).toEqual(CheckBoxInputContext.consume)
})
