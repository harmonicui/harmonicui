import { cloneVNode, DefineComponent, getCurrentInstance, h, Slot } from 'vue'
import type { VNode } from '@vue/runtime-core'
import { UnableToPassPropsThroughFragmentError } from './UnableToPassPropsThroughFragmentError'

interface RenderOptions {
  as: string | DefineComponent[0]
  props?: Record<string, unknown>
  children?: Slot
  childrenProps?: Record<string, unknown>
}

type RenderResult = VNode[] | VNode | undefined

export function render(options: RenderOptions): RenderResult {
  if (options.as === 'fragment') {
    return renderAsFragment(options)
  }

  return renderAsNode(options)
}

function renderAsFragment(options: RenderOptions) {
  const { props, children, childrenProps } = options

  if (haveProps(props)) {
    return renderRootChildAndPassPropsThrough(options)
  }

  return children?.(childrenProps)
}

function renderAsNode({ as, children, childrenProps, props }: RenderOptions) {
  return h(as, props, { default: () => children?.(childrenProps) })
}

function haveProps(props: RenderOptions['props']) {
  return props && Object.keys(props).length > 0
}

function renderRootChildAndPassPropsThrough(
  options: Omit<RenderOptions, 'as'>,
) {
  const { props, children, childrenProps } = options
  const [firstChild, ...otherChildren] = children?.(childrenProps) ?? []

  if (!isElementNode(firstChild) || otherChildren.length > 0) {
    throw new UnableToPassPropsThroughFragmentError(
      getCurrentInstance()?.type.name || '',
    )
  }

  return cloneVNode(firstChild, props)
}

function isElementNode(node: VNode): boolean {
  // No child
  if (!node) {
    return false
  }

  switch (typeof node.type) {
    case 'object': // custom components
    case 'string': // native HTML elements
    case 'function': // Built-in and functional components
      return true

    // comments, texts, ...
    default:
      return false
  }
}
