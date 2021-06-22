import { createContext } from '../createContext'

export interface SwitchThumbContract {
  tabindex: string
  'data-is': string | undefined
}

export const SwitchThumbContext =
  createContext<SwitchThumbContract>('SwitchThumbContext')

export const provideSwitchThumbContext = SwitchThumbContext.provide
export const useSwitchThumbContext = SwitchThumbContext.consume
export const SwitchThumbContextKey = SwitchThumbContext.key
