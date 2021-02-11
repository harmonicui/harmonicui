import { createContext } from './utils/createContext'

type ErrorMessageContract = {
  id: string | null,
  message: string | null,
  visible: boolean | null,
}

const _defaults: ErrorMessageContract = {
  id: null,
  message: null,
  visible: false,
}

const ErrorMessageContext = createContext<ErrorMessageContract>('ErrorMessageContract', _defaults)

const provideErrorMessageContext = ErrorMessageContext.provide
const useErrorMessageContext = ErrorMessageContext.consume

export {
  ErrorMessageContract,
  ErrorMessageContext,
  provideErrorMessageContext,
  useErrorMessageContext,
}
