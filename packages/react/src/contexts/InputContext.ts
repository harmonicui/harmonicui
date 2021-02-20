import { createContext } from './utils/createContext'
import {
  InputContract,
  InputContractDefaultValues as defaults,
} from '@harmonicui/contracts'

export const InputContext = createContext<InputContract>('InputContract', defaults)
export const useInputContext = InputContext.consume
export const InputContextProvider = InputContext.Provider
