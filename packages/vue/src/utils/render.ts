import { cloneVNode, DefineComponent, getCurrentInstance, h, Slot } from 'vue'
import type { VNode } from '@vue/runtime-core'

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

  if (!isElementNode(firstChild)) {
    throwUnableToPassPropsThroughFragmentError()
  }

  if (otherChildren.length > 0) {
    throwUnableToPassPropsThroughFragmentError(true)
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

function throwUnableToPassPropsThroughFragmentError(multipleChild = false) {
  throw new Error(
    [
      '',
      '[Harmonic UI Error]: Unable to pass props to fragment.',
      '',
      [
        `There are a few props that we need to pass-through the <${
          getCurrentInstance()?.type.name
        } /> component.`,
        `However, it is currently rendering as a fragment and has ${
          multipleChild
            ? 'multiple children nodes'
            : 'no valid single-root child'
        }`,
        'so that props can be passed through.',
        '',
        'In order to fix this, you can apply one of the following solutions:',
      ]
        .map(line => `\t ${line}`)
        .join('\n'),
      [
        `Use an \`as = '...'\` prop, to render <${
          getCurrentInstance()?.type.name
        } /> as an element/component instead of a fragment.`,
        'Render a single-root child element/component so that we can forward the props to that element.',
      ]
        .map(line => `\t  - ${line}`)
        .join('\n'),
    ].join('\n'),
  )
}
