import { createElement, ReactElement, ReactNode, useEffect } from 'react'
import { useMenuListContext } from '../../contexts'
import { Keys, renderChildren } from '../../utils'
import { useGenerateId } from '../../hooks'
import { Items } from './Menu'

interface MenuListProps {
  id?: string
  children?: ReactNode
}

export function MenuList({
  id = useGenerateId('MenuList'),
  children,
}: MenuListProps): ReactElement {
  const { closeMenu, data, search, setActiveItem, subscribe } =
    useMenuListContext()

  useEffect(() => {
    subscribe({
      id,
    })
  }, [id])

  function handleOnKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case Keys.Escape:
        event.preventDefault()
        closeMenu()
        break

      case Keys.Space:
        if (data.isSearching) {
          event.preventDefault()
          event.stopPropagation()
          return search(event.key)
        }
      // eslint-disable-next-line no-fallthrough
      case Keys.Enter:
        event.preventDefault()
        if (data.activeItemId) {
          document.getElementById(data.activeItemId)?.click()
        }
        closeMenu()
        break

      case Keys.ArrowDown:
        event.preventDefault()
        setActiveItem(Items.Next)
        break

      case Keys.ArrowUp:
        event.preventDefault()
        setActiveItem(Items.Previous)
        break

      case Keys.End:
      case Keys.PageDown:
        event.preventDefault()
        setActiveItem(Items.Last)
        break

      case Keys.Home:
      case Keys.PageUp:
        event.preventDefault()
        setActiveItem(Items.First)
        break

      default:
        event.preventDefault()
        search(event.key)
    }
  }

  return createElement(
    'div',
    {
      id,
      role: 'menu',
      tabIndex: -1,
      hidden: data.hidden,
      'aria-labelledby': data.ariaLabelledBy,
      'aria-activedescendant': data.ariaActiveDescendant,
      onKeyDown: handleOnKeyDown,
    },
    renderChildren(children, {}),
  )
}
