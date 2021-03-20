import {
  CheckBoxContext,
  useCheckBoxContext,
  CheckBoxContextProvider,
} from '../CheckBoxContext'
test('creates a context for ErrorMessageContract', () => {
  expect(CheckBoxContext).toHaveProperty('Provider')
  expect(CheckBoxContext).toHaveProperty('consume')
})
test('exports alias utilities for using CheckBoxContext', () => {
  expect(CheckBoxContextProvider).toEqual(CheckBoxContext.Provider)
  expect(useCheckBoxContext).toEqual(CheckBoxContext.consume)
})
