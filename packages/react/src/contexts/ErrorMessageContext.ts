import { ErrorMessageContract, ErrorMessageContractDefaultValues as defaults } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const ErrorMessageContext = createContext<ErrorMessageContract>('ErrorMessageContract', defaults)
export const ErrorMessageContextProvider = ErrorMessageContext.Provider
export const useErrorMessageContext = ErrorMessageContext.consume
