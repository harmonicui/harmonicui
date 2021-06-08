import { ComputedRef } from '@vue/reactivity'
import { createContext } from '../createContext'

export interface SwitchThumbContract {
  tabindex: string
  'data-is': ComputedRef<string | undefined> | undefined
}

export const SwitchThumbContext =
  createContext<SwitchThumbContract>('SwitchThumbContext')

export const provideSwitchThumbContext = SwitchThumbContext.provide
export const useSwitchThumbContext = SwitchThumbContext.consume
export const SwitchThumbContextKey = SwitchThumbContext.key
