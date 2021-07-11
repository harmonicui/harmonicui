import { createElement, ReactElement, ReactNode, useEffect } from 'react'
import { useMenuButtonContext } from '../../contexts'
import { Keys, renderChildren } from '../../utils'
import { useGenerateId } from '../../hooks'
import { Items } from './Menu'

interface MenuButtonProps {
  id?: string
  disabled?: boolean
  children?: ReactNode
}

export function MenuButton({
  id = useGenerateId('MenuButton'),
  disabled,
  children,
}: MenuButtonProps): ReactElement {
  const { data, toggleMenu, openMenu, subscribe } = useMenuButtonContext()

  useEffect(() => {
    subscribe({ id })
  }, [id])

  function onClickHandler() {
    toggleMenu()
  }

  function handleOnKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case Keys.Space:
      case Keys.Enter:
      case Keys.ArrowDown:
        if (disabled) return
        event.preventDefault()
        openMenu(Items.First)
        break

      case Keys.ArrowUp:
        if (disabled) return
        event.preventDefault()
        openMenu(Items.Last)
        break
    }
  }

  return createElement(
    'button',
    {
      id,
      disabled,
      role: 'button',
      'aria-haspopup': 'menu',
      'aria-expanded': data.ariaExpanded,
      'aria-controls': data.ariaControls,
      onClick: onClickHandler,
      onKeyDown: handleOnKeyDown,
    },
    renderChildren(children, {}),
  )
}
