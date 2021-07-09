import { defineComponent } from 'vue'
import { screen } from '@testing-library/vue'
import { createRenderer } from '../test-utils'
import { render } from './render'

const Component = defineComponent({
  name: 'TestComponent',
  inheritAttrs: false,

  props: {
    as: {
      type: [String, Object],
      default: 'div',
    },

    slotProps: {
      type: [Object],
      default: {},
    },
  },

  setup(props, { slots, attrs }) {
    return () =>
      render({
        as: props.as,
        props: {
          ...attrs,
        },
        children: slots.default,
        childrenProps: props.slotProps,
      })
  },
})

const renderTemplate = createRenderer({ Component })

test('should render a node', () => {
  renderTemplate(`
    <Component>
      hello world!
    </Component>
  `)

  const element = screen.getByText('hello world!')
  expect(element).toBeInTheDocument()
  expect(element).toBeInstanceOf(HTMLDivElement)
})

test('should forward the props to rendered node', () => {
  renderTemplate(`
    <Component id='my-component' class='color-indigo'>
      hello world!
    </Component>
  `)

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'my-component')
  expect(element).toHaveClass('color-indigo')
})

test('should render the default slot as node children', () => {
  renderTemplate(`
    <Component data-testid='parent-node'>
      <span>hello world!</span>
    </Component>
  `)

  const element = screen.getByTestId('parent-node')
  expect(element.innerHTML).toEqual('<span>hello world!</span>')
})

test('should pass the childrenProps to children', () => {
  renderTemplate(`
    <Component :slotProps="{ id: 'child', className: 'color-red'}" v-slot='{id, className}'>
      <span :id='id' :class='className'>hello world!</span>
    </Component>
  `)

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'child')
  expect(element).toHaveClass('color-red')
})

test('should be possible render as fragment', () => {
  renderTemplate(`
    <div data-testid='container'>
      <Component as='fragment'></Component>
    </div>
  `)

  expect(screen.getByTestId('container').innerHTML).toEqual('<!---->')
})

test('should pass the props and attrs to root child element when rendering as fragment', () => {
  renderTemplate(`
    <Component as='fragment' id='hello-world' role='alert'>
      <span class='color-red'>hello world!</span>
    </Component>
  `)

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'hello-world')
  expect(element).toHaveAttribute('role', 'alert')
  expect(element).toHaveClass('color-red')
})

test('should pass the props and attrs to root child component when rendering as fragment', () => {
  const CustomComponent = defineComponent({
    template: `
      <span class='color-red'>
        <slot></slot>
      </span>
    `,
  })

  renderTemplate({
    template: `
      <Component as='fragment' id='hello-world' role='alert'>
      <CustomComponent>hello world!</CustomComponent>
      </Component>
    `,
    components: {
      Component,
      CustomComponent,
    },
  })

  const element = screen.getByText('hello world!')
  expect(element).toHaveAttribute('id', 'hello-world')
  expect(element).toHaveAttribute('role', 'alert')
  expect(element).toHaveClass('color-red')
})

test('throws error if multiple root children exists while rendering as fragment', () => {
  console.warn = jest.fn

  expect(() => {
    renderTemplate(`
      <Component as='fragment' id='hello-world' role='alert'>
        <span class='color-red'>hello world!</span>
        <span class='color-blue'>hello world!</span>
      </Component>
  `)
  }).toThrowError('Unable to pass props to fragment.')

  jest.restoreAllMocks()
})

test('throws error when child node cant accept props while rendering as fragment', () => {
  console.warn = jest.fn

  expect(() => {
    renderTemplate(`
      <Component as='fragment' id='hello-world' role='alert'>
        <!-- Invalid child to pass props through -->
      </Component>
  `)
  }).toThrowError('Unable to pass props to fragment.')

  jest.restoreAllMocks()
})

test('throws error when no child node exists while rendering as fragment', () => {
  console.warn = jest.fn

  expect(() => {
    renderTemplate(`
      <Component as='fragment' id='hello-world' role='alert'/>
  `)
  }).toThrowError('Unable to pass props to fragment.')

  jest.restoreAllMocks()
})

test('should be possible to render as a custom component', () => {
  const warnSpy = jest.spyOn(console, 'warn')

  const CustomComponent = defineComponent({
    template: `
      <button id='my-btn' class='color-white'>
        <slot></slot>
      </button>
    `,
  })

  renderTemplate({
    template: `
      <Component :as='CustomComponent' hidden>hello world!</Component>
    `,
    setup: () => ({ CustomComponent }),
  })

  /**
   * We should avoid
   *   | [Vue warn]: Non-function value encountered for default slot.
   *   | Prefer function slots for better performance.
   * warning when rendering as custom component.
   */
  expect(warnSpy).not.toHaveBeenCalled()

  expect(screen.getByText('hello world!')).toHaveClass('color-white')
  expect(screen.getByText('hello world!')).not.toBeVisible()
  expect(screen.getByText('hello world!')).toHaveAttribute('id', 'my-btn')
})
