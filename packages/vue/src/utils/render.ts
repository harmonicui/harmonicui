import { h, Slot } from 'vue'
import { VNode } from '@vue/runtime-core'

interface RenderOptions {
  as: string
  props?: Record<string, unknown>
  children?: Slot
  childrenProps?: Record<string, unknown>
}

type RenderResult = VNode[] | VNode | undefined

export function render (options: RenderOptions): RenderResult {
  if (options.as === 'fragment') {
    return renderAsFragment(options.children, options.childrenProps)
  }

  return renderAsNode(options)
}

function renderAsFragment (
  children: RenderOptions['children'],
  childrenProps: RenderOptions['childrenProps'],
) {
  return children?.(childrenProps)
}

function renderAsNode ({
  as,
  children,
  childrenProps,
  props,
}: RenderOptions) {
  return h(as, props, children?.(childrenProps))
}
