import { HelperTextContract } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const HelperTextContext = createContext(HelperTextContract, 'HelperTextContext')
export const provideHelperTextContext = HelperTextContext.provide
export const useHelperTextContext = HelperTextContext.consume
