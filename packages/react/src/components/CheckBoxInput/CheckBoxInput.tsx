import { ChangeEvent, createElement, ElementType, ReactElement } from 'react'
import { useCheckBoxInputContext } from '../../contexts'
import { PolymorphicPropsWithoutRef } from '../../types'

const DEFAULT_ELEMENT = 'input'

export type CheckBoxInputProps<T extends ElementType = typeof DEFAULT_ELEMENT> =
  PolymorphicPropsWithoutRef<unknown, T>

function CheckBoxInput<T extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  ...attrs
}: CheckBoxInputProps<T>): ReactElement {
  const { indeterminate, toggleValue, ...context } = useCheckBoxInputContext()

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    toggleValue(event.target.checked)
  }

  const Element: ElementType = as || DEFAULT_ELEMENT

  return createElement(Element, {
    type: 'checkbox',
    ...attrs,
    'indeterminate.prop': indeterminate ? 'true' : 'false',
    onChange,
    ...context,
  })
}

CheckBoxInput.displayName = 'CheckBoxInput'

export { CheckBoxInput }
