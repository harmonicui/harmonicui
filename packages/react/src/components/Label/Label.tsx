import React, { ReactElement, ReactNode } from 'react'
import { useLabelContext } from '../../contexts'
import { LabelContract } from '@harmonicui/contracts'

interface Props extends Omit<React.ComponentPropsWithoutRef<'label'>, keyof LabelContract> {
  children?: ReactNode
}

export function Label (props: Props): ReactElement {
  const {
    htmlFor,
    id,
  } = useLabelContext()

  return (
    <label htmlFor={htmlFor} id={id} {...props}>
      {props.children}
    </label>
  )
}
