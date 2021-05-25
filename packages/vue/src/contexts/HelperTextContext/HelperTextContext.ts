import { Ref } from 'vue'
import { createContext } from '../createContext'

export interface HelperTextContract {
  id: string
  hidden: boolean | undefined
  ref: Ref<HTMLDivElement | null>
}

export const HelperTextContext =
  createContext<HelperTextContract>('HelperTextContext')

export const provideHelperTextContext = HelperTextContext.provide
export const useHelperTextContext = HelperTextContext.consume
export const HelperTextContextKey = HelperTextContext.key
