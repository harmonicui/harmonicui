import { createElement, ElementType, ReactElement } from 'react'
import { PolymorphicPropsWithoutRef } from '../../types'
import { useLabelContext } from '../../contexts'

const DEFAULT_ELEMENT = 'label'

export type LabelProps<T extends ElementType = typeof DEFAULT_ELEMENT> =
  PolymorphicPropsWithoutRef<unknown, T>

function Label<T extends ElementType = typeof DEFAULT_ELEMENT> ({
  as,
  children,
  ...attrs
}: LabelProps<T>): ReactElement {
  const context = useLabelContext()

  const Element: ElementType = as || DEFAULT_ELEMENT
  return createElement(Element, { ...attrs, ...context }, children)
}

Label.displayName = 'Label'

export { Label }
