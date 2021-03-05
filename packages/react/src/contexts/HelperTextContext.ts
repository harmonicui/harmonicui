import { createContext } from './utils/createContext'
import { HelperTextContract } from '@harmonicui/contracts'

export const HelperTextContext = createContext(HelperTextContract, 'HelperTextContext')
export const useHelperTextContext = HelperTextContext.consume
export const HelperTextContextProvider = HelperTextContext.Provider
