import { createElement, Fragment, FunctionComponentElement, ReactNode } from 'react'
import { RenderLessComponentChildren, RenderProp } from '../types'

function isRenderProp<SlotProps> (node: RenderLessComponentChildren<SlotProps>): node is RenderProp<SlotProps> {
  return typeof node === 'function'
}

type RenderChildrenResult = FunctionComponentElement<{ children?: ReactNode }>

export function renderChildren<SlotProps> (
  children: RenderLessComponentChildren<SlotProps>,
  slotProps: SlotProps,
): RenderChildrenResult {
  const content = isRenderProp(children) ? children(slotProps) : children
  return createElement(Fragment, null, content)
}
