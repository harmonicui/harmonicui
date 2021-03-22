import { ChangeEvent, ComponentPropsWithoutRef, createElement, ReactElement, ReactNode } from 'react'
import { InputContract } from '@harmonicui/contracts'
import { useInputContext } from '../../contexts'

type PropsWeControl = keyof InputContract | 'onChange'

interface Props extends Omit<ComponentPropsWithoutRef<'input'>, PropsWeControl> {
  children?: ReactNode
}

function TextFieldInput ({ ...props }: Props): ReactElement {
  const {
    setValue,
    ...restOfContextData
  } = useInputContext()

  function onChange (event: ChangeEvent<HTMLInputElement>) {
    setValue?.(event.target.value)
  }

  return createElement('input', {
    ...props,
    onChange,
    ...restOfContextData,
  })
}

export default TextFieldInput
