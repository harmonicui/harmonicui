import { createElement, Fragment, useEffect, useState } from 'react'
import type { ReactNode, ReactElement } from 'react'
import { renderChildren } from '../../utils'
import {
  MenuButtonContextProvider,
  MenuListContextProvider,
  MenuItemContextProvider,
} from '../../contexts'
import type {
  MenuButtonContract,
  MenuListContract,
  MenuItemContract,
  SubscriptionRequirements,
} from '../../contexts'
import { MenuList } from './MenuList'
import { MenuButton } from './MenuButton'
import { MenuItem } from './MenuItem'

export enum MenuState {
  Open,
  Closed,
}

function Menu({ children }: { children?: ReactNode }): ReactElement {
  const [menuListId, setMenuListId] = useState<string | null>(null)
  const [menuButtonId, setMenuButtonId] = useState<string | null>(null)
  const [menuState, setMenuState] = useState<MenuState>(MenuState.Closed)
  const [items, setItems] = useState<Array<SubscriptionRequirements>>([])
  const [activeItem, setActiveItem] =
    useState<SubscriptionRequirements | undefined>(undefined)

  function menuIsOpen() {
    return menuState === MenuState.Open
  }

  function menuIsClosed() {
    return menuState === MenuState.Closed
  }

  function closeMenu() {
    setMenuState(MenuState.Closed)
    menuButtonId && document.getElementById(menuButtonId)?.focus()
  }

  function clickOutsideListener(
    this: Window,
    event: WindowEventMap['mousedown'],
  ) {
    const target = event.target as HTMLElement

    if (menuButtonId && document.getElementById(menuButtonId) === target) {
      return
    }

    if (menuListId && document.getElementById(menuListId)?.contains(target)) {
      return
    }

    closeMenu()
  }

  useEffect(() => {
    window.addEventListener('mousedown', clickOutsideListener)

    return () => {
      return window.removeEventListener('mousedown', clickOutsideListener)
    }
  })

  const menuButtonContextValue: MenuButtonContract = {
    subscribe: data => {
      setMenuButtonId(data.id)
    },
    toggleMenu: () => {
      if (menuIsClosed()) {
        setMenuState(MenuState.Open)
        menuListId && document.getElementById(menuListId)?.focus()
      } else {
        closeMenu()
      }
    },
    data: {
      ariaControls: menuListId,
      ariaExpanded: menuIsOpen() || undefined,
    },
  }

  const menuListContextValue: MenuListContract = {
    subscribe: data => {
      setMenuListId(data.id)
    },
    data: {
      hidden: menuIsClosed() || undefined,
      ariaLabelledBy: menuButtonId,
      ariaActiveDescendant: menuIsOpen() ? activeItem?.id : undefined,
    },
  }

  const menuItemContextValue: MenuItemContract = {
    subscribe: data => {
      setItems(itemsList => [...itemsList, data])
    },
    focus: (id: string) => {
      setActiveItem(items.find(item => item.id === id))
    },
    unFocus: () => {
      setActiveItem(undefined)
    },
    close: () => {
      setMenuState(MenuState.Closed)
    },
    data: {
      activeItemId: activeItem?.id || null,
    },
  }

  // const Element: ElementType = as || DEFAULT_ELEMENT
  return createElement(
    MenuButtonContextProvider,
    { value: menuButtonContextValue },
    createElement(
      MenuListContextProvider,
      { value: menuListContextValue },
      createElement(
        MenuItemContextProvider,
        { value: menuItemContextValue },
        createElement(Fragment, null, renderChildren(children, {})),
      ),
    ),
  )
}

Menu.displayName = 'Menu'

Menu.Button = MenuButton
Menu.List = MenuList
Menu.Item = MenuItem

export { Menu }
