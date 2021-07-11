import { HybridChildren, RenderProp } from '../types'
import { ReactNode } from 'react'

export * from './Keyboard'

function isRenderProp<Props>(
  node: HybridChildren<Props>,
): node is RenderProp<Props> {
  return typeof node === 'function'
}

export function renderChildren<ChildrenProps>(
  children: HybridChildren<ChildrenProps>,
  childrenProps: ChildrenProps,
): ReactNode {
  return isRenderProp(children) ? children(childrenProps) : children
}
