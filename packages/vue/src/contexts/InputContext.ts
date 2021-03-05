import { InputContract } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const InputContext = createContext(InputContract, 'InputContext')
export const provideInputContext = InputContext.provide
export const useInputContext = InputContext.consume
