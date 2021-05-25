import { MutableRefObject } from 'react'
import { createContext } from '../createContext'

export interface LabelContract {
  id: string,
  htmlFor: string | undefined
  'data-is': string | undefined
  ref: MutableRefObject<HTMLLabelElement | null>
}

export const LabelContext = createContext<LabelContract>('LabelContext')
export const useLabelContext = LabelContext.consume
export const LabelContextProvider = LabelContext.Provider
