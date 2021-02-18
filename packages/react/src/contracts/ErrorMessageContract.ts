import { createContext } from './utils/createContext'

interface ErrorMessageContract {
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
const useErrorMessageContext = ErrorMessageContext.consume
const ErrorMessageContextProvider = ErrorMessageContext.Provider

export {
  ErrorMessageContract,
  ErrorMessageContext,
  useErrorMessageContext,
  ErrorMessageContextProvider,
}
