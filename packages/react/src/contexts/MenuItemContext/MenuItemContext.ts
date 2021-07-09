import { createContext } from '../createContext'

export interface SubscriptionRequirements {
  id: string
}

export interface MenuItemContract {
  subscribe: (data: SubscriptionRequirements) => void
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
