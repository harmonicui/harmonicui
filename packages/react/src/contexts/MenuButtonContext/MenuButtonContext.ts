import { createContext } from '../createContext'

interface MenuButtonRegistrationData {
  id: string
}

export interface MenuButtonContract {
  subscribe: (data: MenuButtonRegistrationData) => void
  toggleMenu: () => void
  data: {
    ariaControls: string | null
    ariaExpanded: boolean | undefined
  }
}

export const MenuButtonContext =
  createContext<MenuButtonContract>('MenuButtonContext')

export const MenuButtonContextProvider = MenuButtonContext.Provider
export const useMenuButtonContext = MenuButtonContext.consume
