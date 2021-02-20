import { LabelContract, LabelContractDefaultValues as defaults } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const LabelContext = createContext<LabelContract>('LabelContract', defaults)
export const useLabelContext = LabelContext.consume
export const LabelContextProvider = LabelContext.Provider
