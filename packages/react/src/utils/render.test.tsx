import React, { Fragment, ReactNode } from 'react'
import { render } from './render'
import { PolymorphicComponentWithDynamicChildren } from '../types'
import { render as renderTemplate, screen } from '@testing-library/react'
import { UnableToPassPropsThroughFragmentError } from './UnableToPassPropsThroughFragmentError'

const DEFAULT_ELEMENT = 'div'

interface ChildrenProps {
  active: boolean
  id: string
}

interface Props {
  childrenProps?: ChildrenProps
  'data-prop-from-parent'?: boolean
}

function Component<T extends React.ElementType = typeof DEFAULT_ELEMENT>(
  props: PolymorphicComponentWithDynamicChildren<T, Props, ChildrenProps>,
) {
  const { as, children, childrenProps, ...attrs } = props
  return render({
    componentName: 'Component',
    as: as || DEFAULT_ELEMENT,
    props: attrs,
    children: children,
    childrenProps: childrenProps,
  })
}

test('should render a node', () => {
  renderTemplate(<Component>hello world!</Component>)

  const element = screen.getByText('hello world!')
  expect(element).toBeInTheDocument()
  expect(element).toBeInstanceOf(HTMLDivElement)
})

test('should forward the props to rendered node', () => {
  renderTemplate(
    <Component id="my-component" className="color-indigo">
      hello world!
    </Component>,
  )

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'my-component')
  expect(element).toHaveClass('color-indigo')
})

test('should render the children node', () => {
  renderTemplate(
    <Component data-testid="parent-node">
      <span>hello world!</span>
    </Component>,
  )

  const element = screen.getByTestId('parent-node')
  expect(element.innerHTML).toEqual('<span>hello world!</span>')
})

test('should be possible to render children as render prop', () => {
  renderTemplate(
    <Component
      id="parent"
      childrenProps={{
        id: 'child',
        active: true,
      }}
    >
      {({ id, active }) => (
        <span id={id} className={`${active ? 'active' : ''}`}>
          hello world!
        </span>
      )}
    </Component>,
  )

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'child')
  expect(element).toHaveClass('active')
})

test('should be possible render as fragment using `React.Fragment`', () => {
  renderTemplate(
    <div data-testid="container">
      <Component as={Fragment} />
    </div>,
  )

  expect(screen.getByTestId('container').innerHTML).toEqual('')
})

test('should be possible render as fragment using `fragment` word', () => {
  renderTemplate(
    <div data-testid="container">
      <Component as="fragment" />
    </div>,
  )

  expect(screen.getByTestId('container').innerHTML).toEqual('')
})

test('should forward the props and attrs to root child element when rendering as fragment', () => {
  renderTemplate(
    <Component as="fragment" id="hello-world" role="alert">
      <span className="color-red">hello world!</span>
    </Component>,
  )

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'hello-world')
  expect(element).toHaveAttribute('role', 'alert')
  expect(element).toHaveClass('color-red')
})

test('should pass the props and attrs to root child component when rendering as fragment', () => {
  function CustomComponent(props: { children?: ReactNode }) {
    const { children, ...otherProps } = props

    return (
      <span className="color-red" {...otherProps}>
        {children}
      </span>
    )
  }

  renderTemplate(
    <Component as="fragment" id="hello-world" role="alert">
      <CustomComponent>hello world!</CustomComponent>
    </Component>,
  )

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'hello-world')
  expect(element).toHaveAttribute('role', 'alert')
  expect(element).toHaveClass('color-red')
})

test('should forward the props and attrs to root child element when rendering as fragment and render-prop children', () => {
  const childProps = {
    id: 'child',
    active: true,
  }

  renderTemplate(
    <Component as="fragment" data-test="from-parent" childrenProps={childProps}>
      {({ id, active }) => (
        <span id={id} className={`${active ? 'active' : ''}`} dir="rtl">
          hello world!
        </span>
      )}
    </Component>,
  )

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'child')
  expect(element).toHaveAttribute('data-test', 'from-parent')
  expect(element).toHaveAttribute('dir', 'rtl')
  expect(element).toHaveClass('active')
})

test('throws error if multiple root children exists while rendering as fragment', () => {
  console.error = jest.fn

  expect(() => {
    renderTemplate(
      <Component as="fragment" id="hello-world" role="alert">
        <span className="color-red">hello world!</span>
        <span className="color-blue">hello world!</span>
      </Component>,
    )
  }).toThrowError(UnableToPassPropsThroughFragmentError)

  jest.restoreAllMocks()
})

test('throws error if root child is fragment while rendering as fragment', () => {
  console.error = jest.fn

  expect(() => {
    renderTemplate(
      <Component as="fragment" id="hello-world" role="alert">
        <>
          <span className="color-red">hello world!</span>
          <span className="color-blue">hello world!</span>
        </>
      </Component>,
    )
  }).toThrowError(UnableToPassPropsThroughFragmentError)

  jest.restoreAllMocks()
})

test('throws error if root child is fragment while rendering as fragment and render-prop children', () => {
  console.error = jest.fn

  expect(() => {
    renderTemplate(
      <Component as="fragment" id="id">
        {() => (
          <>
            <span>hello world!</span>
            <span>hello world!</span>
          </>
        )}
      </Component>,
    )
  }).toThrowError(UnableToPassPropsThroughFragmentError)

  jest.restoreAllMocks()
})

test('throws error when child node cant accept props while rendering as fragment', () => {
  console.error = jest.fn

  expect(() => {
    renderTemplate(
      <Component as="fragment" id="hello-world" role="alert">
        Invalid child to pass props through
      </Component>,
    )
  }).toThrowError(UnableToPassPropsThroughFragmentError)

  jest.restoreAllMocks()
})

test('throws error when no child node exists while rendering as fragment', () => {
  console.error = jest.fn

  expect(() => {
    renderTemplate(<Component as="fragment" id="hello-world" role="alert" />)
  }).toThrowError(UnableToPassPropsThroughFragmentError)

  jest.restoreAllMocks()
})

test('should be possible to render as a custom component', () => {
  function CustomComponent(props: { children?: ReactNode }) {
    const { children, ...otherProps } = props

    return (
      <button id="my-btn" className="color-white" {...otherProps}>
        {children}
      </button>
    )
  }

  renderTemplate(
    <Component as={CustomComponent} data-prop-from-parent={true}>
      hello world!
    </Component>,
  )

  expect(screen.getByText('hello world!')).toHaveClass('color-white')
  expect(screen.getByText('hello world!')).toHaveAttribute('id', 'my-btn')
  expect(screen.getByText('hello world!')).toHaveAttribute(
    'data-prop-from-parent',
    'true',
  )
})
