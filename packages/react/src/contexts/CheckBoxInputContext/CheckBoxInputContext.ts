import { MutableRefObject } from 'react'
import { createContext } from '../createContext'

export interface CheckBoxInputContract {
  id: string
  required: boolean
  disabled: boolean
  value: string | number
  checked: boolean
  indeterminate: boolean
  'aria-invalid': boolean | undefined
  'aria-describedby': string | undefined
  'aria-errormessage': string | undefined
  toggleValue: (checked: boolean) => void
  ref: MutableRefObject<HTMLInputElement | null>
}

export const CheckBoxInputContext = createContext<CheckBoxInputContract>(
  'CheckBoxInputContext',
)
export const useCheckBoxInputContext = CheckBoxInputContext.consume
export const CheckBoxInputContextProvider = CheckBoxInputContext.Provider
