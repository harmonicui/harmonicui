import { InputContract, InputContractDefaultValues as defaults } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const InputContext = createContext<InputContract>('InputContract', defaults)
export const provideInputContext = InputContext.provide
export const useInputContext = InputContext.consume
