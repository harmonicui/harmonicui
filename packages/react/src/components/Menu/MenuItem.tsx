import { createElement, ReactNode, useEffect } from 'react'
import type { ReactElement, MouseEvent } from 'react'
import { useComposeDataState, useGenerateId } from '../../hooks'
import { useMenuItemContext } from '../../contexts'
import { renderChildren } from '../../utils'

interface MenuItemProps {
  id?: string
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
  children?: ReactNode
}

export function MenuItem({
  children,
  disabled,
  onClick,
  id = useGenerateId('MenuItem'),
}: MenuItemProps): ReactElement {
  const { close, data, focus, subscribe, unFocus } = useMenuItemContext()

  useEffect(() => {
    subscribe({ id })
  }, [id])

  function isActive() {
    return id === data.activeItemId
  }

  function onFocusHandler() {
    focus(id)
  }

  function onHoverHandler() {
    if (disabled) {
      return
    }

    focus(id)
  }

  function onUnHoverHandler() {
    if (disabled) {
      return
    }

    unFocus()
  }

  function onCLickHandler(event: MouseEvent) {
    if (disabled) {
      return event.preventDefault()
    }

    close()
    onClick?.(event)
  }

  return createElement(
    'div',
    {
      id,
      role: 'menuitem',
      'aria-disabled': disabled,
      tabIndex: !disabled ? -1 : undefined,
      onPointerMove: onHoverHandler,
      onPointerLeave: onUnHoverHandler,
      onFocus: onFocusHandler,
      onClick: onCLickHandler,
      'data-state': useComposeDataState({
        active: isActive(),
        disabled,
      }),
    },
    renderChildren(children, {}),
  )
}
