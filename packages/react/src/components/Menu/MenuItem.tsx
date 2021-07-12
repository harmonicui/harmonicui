import React, { useEffect } from 'react'
import type { ReactElement, MouseEvent } from 'react'
import { useComposeDataState, useGenerateId } from '../../hooks'
import { useMenuItemContext } from '../../contexts'
import { PolymorphicComponentWithDynamicChildren } from '../../types'
import { render } from '../../utils/render'

interface MenuItemProps {
  id?: string
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}

interface MenuItemChildrenProps {
  isActive: boolean
}

const COMPONENT_NAME = 'MenuItem'
const DEFAULT_ELEMENT = 'fragment'

function MenuItem<T extends React.ElementType = typeof DEFAULT_ELEMENT>(
  props: PolymorphicComponentWithDynamicChildren<
    T,
    MenuItemProps,
    MenuItemChildrenProps
  >,
): ReactElement {
  const {
    id = useGenerateId(COMPONENT_NAME),
    disabled = false,
    onClick,
    as,
    children,
    ...attrs
  } = props
  const { close, data, focus, subscribe, unFocus } = useMenuItemContext()

  useEffect(() => {
    subscribe({
      id,
      disabled,
      text: document.getElementById(id)?.textContent || '',
    })
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

  return render({
    componentName: COMPONENT_NAME,
    as: as || DEFAULT_ELEMENT,
    props: {
      ...attrs,
      id,
      role: 'menuitem',
      'aria-disabled': disabled || undefined,
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
    children,
    childrenProps: { isActive: isActive() },
  })
}

MenuItem.displayName = COMPONENT_NAME

export { MenuItem }
