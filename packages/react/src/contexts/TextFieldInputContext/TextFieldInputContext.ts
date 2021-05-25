import { MutableRefObject } from 'react'
import { createContext } from '../createContext'

export interface TextFieldInputContract {
  id: string
  required: boolean
  disabled: boolean
  value: string | number
  'aria-invalid': boolean | undefined
  'aria-describedby': string | undefined
  'aria-errormessage': string | undefined
  setValue: (value: string | number) => void
  ref: MutableRefObject<HTMLInputElement | null>
}

export const TextFieldInputContext = createContext<TextFieldInputContract>(
  'TextFieldInputContext',
)
export const useTextFieldInputContext = TextFieldInputContext.consume
export const TextFieldInputContextProvider = TextFieldInputContext.Provider
