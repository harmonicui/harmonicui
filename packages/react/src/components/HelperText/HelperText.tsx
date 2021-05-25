import { createElement, ElementType, ReactElement } from 'react'
import { useHelperTextContext } from '../../contexts'
import { PolymorphicPropsWithoutRef } from '../../types'

const DEFAULT_ELEMENT = 'div'

export type HelperTextProps<T extends ElementType = typeof DEFAULT_ELEMENT> =
  PolymorphicPropsWithoutRef<unknown, T>

function HelperText<T extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  children,
  ...attrs
}: HelperTextProps<T>): ReactElement {
  const context = useHelperTextContext()

  const Element: ElementType = as || DEFAULT_ELEMENT
  return createElement(Element, { ...attrs, ...context }, children)
}

HelperText.displayName = 'HelperText'
export { HelperText }
