import type { ReactElement } from 'react'
import React, { createElement, useEffect, useState } from 'react'
import type {
  MenuButtonContract,
  MenuItemContract,
  MenuListContract,
  SubscribedMenuItem,
} from '../../contexts'
import {
  MenuButtonContextProvider,
  MenuItemContextProvider,
  MenuListContextProvider,
} from '../../contexts'
import { MenuList } from './MenuList'
import { MenuButton } from './MenuButton'
import { MenuItem } from './MenuItem'
import { PolymorphicComponentWithDynamicChildren } from '../../types'
import { render } from '../../utils/render'

export enum Items {
  First = 'First',
  Last = 'Last',
  Next = 'Next',
  Previous = 'Previous',
  Specific = 'Specific',
  None = 'None',
}

export enum MenuState {
  Open,
  Closed,
}

interface MenuChildrenProps {
  isOpen: boolean
}

const COMPONENT_NAME = 'Menu'
const DEFAULT_ELEMENT = 'fragment'

function Menu<T extends React.ElementType = typeof DEFAULT_ELEMENT>(
  props: PolymorphicComponentWithDynamicChildren<T, unknown, MenuChildrenProps>,
): ReactElement {
  const { as, children, ...attrs } = props

  const [menuListId, setMenuListId] = useState<string | null>(null)
  const [menuButtonId, setMenuButtonId] = useState<string | null>(null)
  const [menuState, setMenuState] = useState<MenuState>(MenuState.Closed)
  const [items, setItems] = useState<Array<SubscribedMenuItem>>([])
  const [activeItem, setActiveItem] =
    useState<SubscribedMenuItem | undefined>(undefined)
  const [searchDebounce, setSearchDebounce] =
    useState<ReturnType<typeof setTimeout> | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  function selectItem(item: Items.Specific, id: string): void
  function selectItem(item: Exclude<Items, Items.Specific>): void
  function selectItem(item: Items, id?: string) {
    switch (item) {
      case Items.First:
        setActiveItem(items.find(item => !item.disabled))
        break

      case Items.Last:
        setActiveItem(
          items
            .slice()
            .reverse()
            .find(item => !item.disabled),
        )
        break

      case Items.Next:
        setActiveItem(
          items.find((item, index) => {
            const currentIndex = items.findIndex(i => i.id === activeItem?.id)

            return index > currentIndex && !item.disabled
          }) || activeItem,
        )
        break

      case Items.Previous:
        setActiveItem(
          items
            .slice()
            .reverse()
            .find((item, index) => {
              const currentIndex = items
                .slice()
                .reverse()
                .findIndex(i => i.id === activeItem?.id)

              return index > currentIndex && !item.disabled
            }) || activeItem,
        )
        break

      case Items.Specific:
        setActiveItem(items.find(item => item.id === id))
        break

      case Items.None:
        setActiveItem(undefined)
        break
    }
  }

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
    openMenu: activeItem => {
      setMenuState(MenuState.Open)
      menuListId && document.getElementById(menuListId)?.focus()
      selectItem(activeItem)
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
    setActiveItem: selectItem,
    search: function (value: string) {
      if (searchDebounce) {
        clearTimeout(searchDebounce)
      }

      const currentSearchQuery = searchQuery + value

      setActiveItem(
        items.find(
          item =>
            item.text
              .toLowerCase()
              .startsWith(currentSearchQuery.toLowerCase()) && !item.disabled,
        ),
      )

      setSearchQuery(currentSearchQuery)

      setSearchDebounce(setTimeout(() => setSearchQuery(''), 500))
    },
    closeMenu,
    data: {
      isSearching: !!searchDebounce,
      activeItemId: activeItem?.id,
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
      selectItem(Items.Specific, id)
    },
    unFocus: () => {
      selectItem(Items.None)
    },
    close: () => {
      setMenuState(MenuState.Closed)
    },
    data: {
      activeItemId: activeItem?.id || null,
    },
  }

  return createElement(
    MenuButtonContextProvider,
    { value: menuButtonContextValue },
    createElement(
      MenuListContextProvider,
      { value: menuListContextValue },
      createElement(
        MenuItemContextProvider,
        { value: menuItemContextValue },
        render({
          componentName: COMPONENT_NAME,
          as: as || DEFAULT_ELEMENT,
          props: attrs,
          children,
          childrenProps: {
            isOpen: menuIsOpen(),
          },
        }),
      ),
    ),
  )
}

Menu.displayName = COMPONENT_NAME

Menu.Button = MenuButton
Menu.List = MenuList
Menu.Item = MenuItem

export { Menu }
