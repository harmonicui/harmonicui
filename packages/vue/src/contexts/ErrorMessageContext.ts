import { ErrorMessageContract } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const ErrorMessageContext = createContext(ErrorMessageContract, 'ErrorMessageContext')
export const provideErrorMessageContext = ErrorMessageContext.provide
export const useErrorMessageContext = ErrorMessageContext.consume
