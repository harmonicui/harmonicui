import { createContext } from '../createContext'
import { Items } from '../../components/Menu/Menu'

interface MenuListSubscription {
  id: string
}

export interface MenuListContract {
  subscribe: (data: MenuListSubscription) => void
  closeMenu: () => void
  setActiveItem: (item: Exclude<Items, Items.Specific>) => void
  search: (value: string) => void
  data: {
    isSearching: boolean
    activeItemId: string | undefined
    hidden: boolean | undefined
    ariaLabelledBy: string | null
    ariaActiveDescendant: string | undefined
  }
}

export const MenuListContext =
  createContext<MenuListContract>('MenuItemsContext')

export const provideMenuListContext = MenuListContext.provide
export const useMenuListContext = MenuListContext.consume
export const MenuListContextKey = MenuListContext.key
