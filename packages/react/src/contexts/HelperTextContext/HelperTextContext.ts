import { MutableRefObject } from 'react'
import { createContext } from '../createContext'

export interface HelperTextContract {
  id: string
  hidden: boolean
  ref: MutableRefObject<HTMLDivElement | null>
}

export const HelperTextContext =
  createContext<HelperTextContract>('HelperTextContext')
export const useHelperTextContext = HelperTextContext.consume
export const HelperTextContextProvider = HelperTextContext.Provider
