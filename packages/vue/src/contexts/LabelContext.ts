import { LabelContract } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const LabelContext = createContext(LabelContract, 'LabelContext')
export const provideLabelContext = LabelContext.provide
export const useLabelContext = LabelContext.consume
