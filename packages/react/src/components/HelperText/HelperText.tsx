import React, { ReactElement, ReactNode } from 'react'
import { HelperTextContract } from '@harmonicui/contracts'
import { useHelperTextContext } from '../../contexts'

interface Props extends Omit<React.ComponentPropsWithoutRef<'span'>, keyof HelperTextContract> {
  children?: ReactNode
}

function HelperText (props: Props): ReactElement {
  const {
    id,
    hidden,
  } = useHelperTextContext()

  return (
    <span id={id} hidden={hidden}>
      {props.children}
    </span>
  )
}

export default HelperText
