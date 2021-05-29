import { ComputedRef, Ref } from 'vue'
import { createContext } from '../createContext'

export interface CheckBoxInputContract {
  ref: Ref<HTMLInputElement | null>
  id: string
  required: boolean
  disabled: boolean
  indeterminate: boolean | undefined
  checked: boolean | undefined
  modelValue: ComputedRef<boolean | undefined>
  value: string | undefined
  toggleValue: () => void
  'aria-invalid': boolean | undefined
  'aria-errormessage': ComputedRef<string | undefined>
  'aria-describedby': ComputedRef<string | undefined>
}

export const CheckBoxInputContext = createContext<CheckBoxInputContract>(
  'CheckBoxInputContext',
)

export const provideCheckBoxInputContext = CheckBoxInputContext.provide
export const useCheckBoxInputContext = CheckBoxInputContext.consume
export const CheckBoxInputContextKey = CheckBoxInputContext.key
