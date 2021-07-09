import { createElement, ReactElement, ReactNode, useEffect } from 'react'
import { useMenuButtonContext } from '../../contexts'
import { renderChildren } from '../../utils'
import { useGenerateId } from '../../hooks'

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
  const { data, toggleMenu, subscribe } = useMenuButtonContext()

  useEffect(() => {
    subscribe({ id })
  }, [id])

  function onClickHandler() {
    toggleMenu()
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
    },
    renderChildren(children, {}),
  )
}
