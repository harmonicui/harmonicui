import { ComputedRef, Ref } from 'vue'
import { createContext } from '../createContext'

export interface CheckBoxInputContract {
  ref: Ref<HTMLInputElement | null>
  id: string
  required: boolean
  disabled: boolean
  checked: boolean
  indeterminate:boolean
  modelValue: Array<unknown> | string | undefined
  value: string | undefined
  setModelValue: ((value: string) => void)
  'aria-invalid': boolean | undefined
  'aria-errormessage': ComputedRef<string | undefined>
  'aria-describedby': ComputedRef<string | undefined>
}

export const CheckBoxInputContext = createContext<CheckBoxInputContract>('CheckBoxInputContext')

export const provideCheckBoxInputContext = CheckBoxInputContext.provide
export const useCheckBoxInputContext = CheckBoxInputContext.consume
export const CheckBoxInputContextKey = CheckBoxInputContext.key
