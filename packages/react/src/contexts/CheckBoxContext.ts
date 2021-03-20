import { CheckBoxContract } from '@harmonicui/contracts'
import { createContext } from './utils/createContext'

export const CheckBoxContext = createContext(CheckBoxContract, 'CheckBoxContext')
export const CheckBoxContextProvider = CheckBoxContext.Provider
export const useCheckBoxContext = CheckBoxContext.consume
