import { ComputedRef, Ref } from 'vue'
import { createContext } from '../createContext'

export interface SwitchToggleContract {
  ref: Ref<HTMLElement | null>
  id: string
  role: string
  tabindex: string
  disabled: boolean
  modelValue: ComputedRef<boolean | undefined>
  value: string | undefined
  toggleValue: () => void
  handleKeyDown: (event: KeyboardEvent) => void
  'aria-checked': ComputedRef<boolean | undefined>
  'aria-describedby': ComputedRef<string | undefined>
  'aria-labelledby': ComputedRef<string | undefined>
}

export const SwitchToggleContext = createContext<SwitchToggleContract>(
  'SwitchToggleContext',
)

export const provideSwitchToggleContext = SwitchToggleContext.provide
export const useSwitchToggleContext = SwitchToggleContext.consume
export const SwitchToggleContextKey = SwitchToggleContext.key
