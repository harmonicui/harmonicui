import { createContext } from '../createContext'

export interface SubscribedMenuItem {
  id: string
  disabled: boolean
  text: string
}

export interface MenuItemContract {
  subscribe: (data: SubscribedMenuItem) => void
  focus: (id: string) => void
  unFocus: () => void
  close: () => void
  data: {
    activeItemId: string | null
  }
}

export const MenuItemContext =
  createContext<MenuItemContract>('MenuItemContext')

export const MenuItemContextProvider = MenuItemContext.Provider
export const useMenuItemContext = MenuItemContext.consume
