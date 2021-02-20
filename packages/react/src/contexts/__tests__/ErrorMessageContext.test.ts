import {
  ErrorMessageContext,
  useErrorMessageContext,
  ErrorMessageContextProvider,
} from '../ErrorMessageContext'

test('creates a context for ErrorMessageContract', () => {
  expect(ErrorMessageContext).toHaveProperty('Provider')
  expect(ErrorMessageContext).toHaveProperty('consume')
})

test('exports alias utilities for using ErrorMessageContext', () => {
  expect(ErrorMessageContextProvider).toEqual(ErrorMessageContext.Provider)
  expect(useErrorMessageContext).toEqual(ErrorMessageContext.consume)
})
