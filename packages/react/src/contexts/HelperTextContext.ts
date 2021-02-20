import { createContext } from './utils/createContext'
import {
  HelperTextContract,
  HelperTextContractDefaultValues as defaults,
} from '@harmonicui/contracts'

export const HelperTextContext = createContext<HelperTextContract>('HelperTextContract', defaults)
export const useHelperTextContext = HelperTextContext.consume
export const HelperTextContextProvider = HelperTextContext.Provider
