import { createElement, ElementType, ReactElement } from 'react'
import { PolymorphicPropsWithoutRef } from '../../types'
import { useErrorMessageContext } from '../../contexts'

const DEFAULT_ELEMENT = 'div'

export type ErrorMessageProps<T extends ElementType = typeof DEFAULT_ELEMENT> =
  PolymorphicPropsWithoutRef<unknown, T>

function ErrorMessage<T extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  children,
  ...attrs
}: ErrorMessageProps<T>): ReactElement {
  const context = useErrorMessageContext()

  const Element: ElementType = as || DEFAULT_ELEMENT
  return createElement(Element, { ...attrs, ...context }, children)
}

ErrorMessage.displayName = 'ErrorMessage'

export { ErrorMessage }
