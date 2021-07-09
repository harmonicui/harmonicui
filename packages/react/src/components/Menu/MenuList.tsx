import { createElement, ReactElement, ReactNode, useEffect } from 'react'
import { useMenuListContext } from '../../contexts'
import { renderChildren } from '../../utils'
import { useGenerateId } from '../../hooks'

interface MenuListProps {
  id?: string
  children?: ReactNode
}

export function MenuList({
  id = useGenerateId('MenuList'),
  children,
}: MenuListProps): ReactElement {
  const { data, subscribe } = useMenuListContext()

  useEffect(() => {
    subscribe({
      id,
    })
  }, [id])

  return createElement(
    'div',
    {
      id,
      role: 'menu',
      tabIndex: -1,
      hidden: data.hidden,
      'aria-labelledby': data.ariaLabelledBy,
      'aria-activedescendant': data.ariaActiveDescendant,
    },
    renderChildren(children, {}),
  )
}
