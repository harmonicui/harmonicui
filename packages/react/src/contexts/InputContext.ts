import { createContext } from './utils/createContext'
import { InputContract } from '@harmonicui/contracts'

export const InputContext = createContext(InputContract, 'InputContext')
export const useInputContext = InputContext.consume
export const InputContextProvider = InputContext.Provider
