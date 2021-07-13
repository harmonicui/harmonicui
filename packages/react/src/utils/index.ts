import { DynamicChildren, RenderProp } from '../types'
import { ReactNode } from 'react'

export * from './Keyboard'
export * from './UnableToPassPropsThroughFragmentError'

function isRenderProp<Props>(
  node: DynamicChildren<Props>,
): node is RenderProp<Props> {
  return typeof node === 'function'
}

export function renderChildren<ChildrenProps>(
  children: DynamicChildren<ChildrenProps>,
  childrenProps: ChildrenProps,
): ReactNode {
  return isRenderProp(children) ? children(childrenProps) : children
}
