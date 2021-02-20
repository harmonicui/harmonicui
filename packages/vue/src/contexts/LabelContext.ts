import { LabelContract, LabelContractDefaultValues as defaults } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const LabelContext = createContext<LabelContract>('LabelContract', defaults)
export const provideLabelContext = LabelContext.provide
export const useLabelContext = LabelContext.consume
