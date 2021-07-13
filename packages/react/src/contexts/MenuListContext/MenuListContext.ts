import { createContext } from '../createContext'
import { Items } from '../../components/Menu/Menu'

interface MenuListRegistrationData {
  id: string
}

export interface MenuListContract {
  subscribe: (data: MenuListRegistrationData) => void
  setActiveItem: (item: Exclude<Items, Items.Specific>) => void
  search: (value: string) => void
  closeMenu: () => void
  data: {
    isSearching: boolean
    activeItemId: string | undefined
    hidden: boolean | undefined
    ariaLabelledBy: string | null
    ariaActiveDescendant: string | undefined
  }
}

export const MenuListContext =
  createContext<MenuListContract>('MenuListContext')

export const MenuListContextProvider = MenuListContext.Provider
export const useMenuListContext = MenuListContext.consume
