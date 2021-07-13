import { createContext } from '../createContext'
import { Items } from '../../components/Menu/Menu'

interface MenuButtonRegistrationData {
  id: string
}

export interface MenuButtonContract {
  subscribe: (data: MenuButtonRegistrationData) => void
  openMenu: (activeItem: Items.First | Items.Last | Items.None) => void
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
