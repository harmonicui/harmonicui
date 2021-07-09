import { createContext } from '../createContext'

interface MenuListRegistrationData {
  id: string
}

export interface MenuListContract {
  subscribe: (data: MenuListRegistrationData) => void
  data: {
    hidden: boolean | undefined
    ariaLabelledBy: string | null
    ariaActiveDescendant: string | undefined
  }
}

export const MenuListContext =
  createContext<MenuListContract>('MenuListContext')

export const MenuListContextProvider = MenuListContext.Provider
export const useMenuListContext = MenuListContext.consume
