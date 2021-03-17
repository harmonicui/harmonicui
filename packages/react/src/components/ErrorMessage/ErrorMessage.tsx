import React, { createElement, ReactElement, ReactNode } from 'react'
import { ErrorMessageContract } from '@harmonicui/contracts'
import { useErrorMessageContext } from '../../contexts'

interface Props extends Omit<React.ComponentPropsWithoutRef<'span'>, keyof ErrorMessageContract> {
  children?: ReactNode
}

function ErrorMessage ({
  children,
  ...otherPros
}: Props): ReactElement {
  const {
    id,
    hidden,
    message,
  } = useErrorMessageContext()

  return createElement('span', {
    id,
    hidden,
    ...otherPros,
  }, children ?? message)
}

export default ErrorMessage
