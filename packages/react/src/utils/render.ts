import {
  cloneElement,
  createElement,
  ElementType,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react'
import { DynamicChildren, RenderProp } from '../types'
import { UnableToPassPropsThroughFragmentError } from './UnableToPassPropsThroughFragmentError'

interface RenderOptions<ChildrenProps> {
  componentName: string
  as: ElementType
  props?: Record<string, unknown>
  children: ReactNode
  childrenProps?: ChildrenProps
}

type RenderResult = ReturnType<typeof createElement>

export function render<T>(options: RenderOptions<T>): RenderResult {
  if (isRenderingAsFragment(options.as)) {
    return renderAsFragment(options)
  }

  return createElement(
    options.as,
    options.props,
    renderChildren(options.children, options.childrenProps),
  )
}

function isRenderingAsFragment<T>(as: RenderOptions<T>['as']) {
  return as === 'fragment' || as === Fragment
}

function renderAsFragment<T>(options: RenderOptions<T>) {
  if (haveProps(options.props)) {
    const rootChild = renderChildren(
      options.children,
      options.childrenProps,
    ) as ReactElement

    if (!isValidElement(rootChild) || rootChild.type === Fragment) {
      throw new UnableToPassPropsThroughFragmentError(options.componentName)
    }

    const children = cloneElement(rootChild, options.props)
    return createElement(Fragment, null, children)
  }

  return createElement(
    Fragment,
    null,
    renderChildren(options.children, options.childrenProps),
  )
}

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

function haveProps(props: Record<string, unknown> | undefined) {
  return props && props && Object.keys(props).length > 0
}
