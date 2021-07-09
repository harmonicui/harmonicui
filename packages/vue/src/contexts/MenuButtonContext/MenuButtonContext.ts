import { createContext } from '../createContext'
import { Items } from '../../components/Menu/Menu'

interface MenuButtonSubscription {
  id: string
}

export interface MenuButtonContract {
  subscribe: (data: MenuButtonSubscription) => void
  openMenu: (activeItem: Items.First | Items.Last | Items.None) => void
  toggleMenu: () => void
  data: {
    ariaControls: string | null
    ariaExpanded: boolean | undefined
  }
}

export const MenuButtonContext =
  createContext<MenuButtonContract>('MenuButtonContext')

export const provideMenuButtonContext = MenuButtonContext.provide
export const useMenuButtonContext = MenuButtonContext.consume
export const MenuButtonContextKey = MenuButtonContext.key
