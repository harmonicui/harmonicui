import { HelperTextContract, HelperTextContractDefaultValues as defaults } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const HelperTextContext = createContext<HelperTextContract>('HelperTextContract', defaults)
export const provideHelperTextContext = HelperTextContext.provide
export const useHelperTextContext = HelperTextContext.consume
