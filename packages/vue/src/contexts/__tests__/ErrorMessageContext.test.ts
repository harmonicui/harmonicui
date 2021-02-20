import { ErrorMessageContext, provideErrorMessageContext, useErrorMessageContext } from '../ErrorMessageContext'

test('creates a context for ErrorMessageContract', () => {
  expect(ErrorMessageContext).toHaveProperty('provide')
  expect(ErrorMessageContext).toHaveProperty('consume')
})

test('exports alias utilities for using ErrorMessageContext', () => {
  expect(provideErrorMessageContext).toEqual(ErrorMessageContext.provide)
  expect(useErrorMessageContext).toEqual(ErrorMessageContext.consume)
})
