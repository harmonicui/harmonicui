import { createContext } from '../createContext'

export interface MenuItemSubscription {
  id: string
  disabled: boolean
  text: string
}

export interface MenuItemContract {
  subscribe: (data: MenuItemSubscription) => void
  focus: (id: string) => void
  unFocus: () => void
  close: () => void
  data: {
    activeItemId: string | null
  }
}

export const MenuItemContext =
  createContext<MenuItemContract>('MenuItemContext')

export const provideMenuItemContext = MenuItemContext.provide
export const useMenuItemContext = MenuItemContext.consume
export const MenuItemContextKey = MenuItemContext.key
