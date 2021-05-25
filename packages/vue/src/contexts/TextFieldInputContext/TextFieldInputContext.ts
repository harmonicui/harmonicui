import { ComputedRef, Ref } from 'vue'
import { createContext } from '../createContext'

export interface TextFieldInputContract {
  ref: Ref<HTMLInputElement | null>
  id: string
  required: boolean
  disabled: boolean
  value: string | number | undefined
  setValue: (value: string | number) => void
  'aria-invalid': boolean | undefined
  'aria-errormessage': ComputedRef<string | undefined>
  'aria-describedby': ComputedRef<string | undefined>
}

export const TextFieldInputContext = createContext<TextFieldInputContract>(
  'TextFieldInputContext',
)

export const provideTextFieldInputContext = TextFieldInputContext.provide
export const useTextFieldInputContext = TextFieldInputContext.consume
export const TextFieldInputContextKey = TextFieldInputContext.key
