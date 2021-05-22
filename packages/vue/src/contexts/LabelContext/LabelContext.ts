import { ComputedRef, Ref } from 'vue'
import { createContext } from '../createContext'

export interface LabelContract {
  id: string,
  'data-is': string | undefined
  ref: Ref<HTMLLabelElement | null>
  for: ComputedRef<string | undefined>
}

export const LabelContext = createContext<LabelContract>('LabelContext')

export const provideLabelContext = LabelContext.provide
export const useLabelContext = LabelContext.consume
export const LabelContextKey = LabelContext.key
