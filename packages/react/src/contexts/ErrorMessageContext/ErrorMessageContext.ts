import { MutableRefObject } from 'react'
import { createContext } from '../createContext'

export interface ErrorMessageContract {
  id: string
  hidden: boolean
  ref: MutableRefObject<HTMLDivElement | null>
}

export const ErrorMessageContext = createContext<ErrorMessageContract>(
  'ErrorMessageContext',
)
export const ErrorMessageContextProvider = ErrorMessageContext.Provider
export const useErrorMessageContext = ErrorMessageContext.consume
