import { CheckBoxContract } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const CheckBoxContext = createContext(CheckBoxContract, 'CheckBoxContext')
export const provideCheckBoxContext = CheckBoxContext.provide
export const useCheckBoxContext = CheckBoxContext.consume
