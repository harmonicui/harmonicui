import React, { ReactElement, useEffect } from 'react'
import { useMenuButtonContext } from '../../contexts'
import { Keys } from '../../utils'
import { useGenerateId } from '../../hooks'
import { Items } from './Menu'
import { PolymorphicComponentWithChildren } from '../../types'
import { render } from '../../utils/render'

interface MenuButtonProps {
  id?: string
  disabled?: boolean
}

const COMPONENT_NAME = 'MenuButton'
const DEFAULT_ELEMENT = 'button'

function MenuButton<T extends React.ElementType = typeof DEFAULT_ELEMENT>(
  props: PolymorphicComponentWithChildren<T, MenuButtonProps>,
): ReactElement {
  const {
    id = useGenerateId(COMPONENT_NAME),
    disabled,
    as,
    children,
    ...attrs
  } = props

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

  return render({
    componentName: COMPONENT_NAME,
    as: as || DEFAULT_ELEMENT,
    props: {
      ...attrs,
      id,
      disabled,
      role: 'button',
      'aria-haspopup': 'menu',
      'aria-expanded': data.ariaExpanded,
      'aria-controls': data.ariaControls,
      onClick: onClickHandler,
      onKeyDown: handleOnKeyDown,
    },
    children,
  })
}

MenuButton.displayName = COMPONENT_NAME

export { MenuButton }
