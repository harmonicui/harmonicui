import { ChangeEvent, createElement, ElementType, ReactElement } from 'react'
import { useTextFieldInputContext } from '../../contexts'
import { PolymorphicPropsWithoutRef } from '../../types'

const DEFAULT_ELEMENT = 'input'

export type TextFieldInputProps<
  T extends ElementType = typeof DEFAULT_ELEMENT,
> = PolymorphicPropsWithoutRef<unknown, T>

function TextFieldInput<T extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  ...attrs
}: TextFieldInputProps<T>): ReactElement {
  const { setValue, ...context } = useTextFieldInputContext()

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue?.(event.target.value)
  }

  const Element: ElementType = as || DEFAULT_ELEMENT

  return createElement(Element, {
    ...attrs,
    onChange,
    ...context,
  })
}

TextFieldInput.displayName = 'TextFieldInput'

export { TextFieldInput }
