import { ErrorMessageContract } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const ErrorMessageContext = createContext(ErrorMessageContract, 'ErrorMessageContext')
export const ErrorMessageContextProvider = ErrorMessageContext.Provider
export const useErrorMessageContext = ErrorMessageContext.consume
