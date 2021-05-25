import { Ref } from 'vue'
import { createContext } from '../createContext'

export interface ErrorMessageContract {
  id: string
  hidden: boolean | undefined
  ref: Ref<HTMLDivElement | null>
}

export const ErrorMessageContext = createContext<ErrorMessageContract>(
  'ErrorMessageContext',
)

export const provideErrorMessageContext = ErrorMessageContext.provide
export const useErrorMessageContext = ErrorMessageContext.consume
export const ErrorMessageContextKey = ErrorMessageContext.key
