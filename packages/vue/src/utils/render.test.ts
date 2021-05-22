import { h } from 'vue'
import { render as renderer } from './render'
import { renderInlineComponent } from '../test-utils'

function runRenderFunction (options: Parameters<typeof renderer>[0]) {
  return renderInlineComponent({
    setup () {
      return () => renderer(options)
    },
  })
}

const container = document.firstElementChild

test('renders a node', () => {
  runRenderFunction({
    as: 'span',
    props: { id: 'id' },
  })

  const node = container?.querySelector('span')
  expect(node).not.toBeNull()
})

test('forward the pros to rendered node', () => {
  runRenderFunction({
    as: 'span',
    props: {
      id: 'test-id',
      class: 'test-class',
    },
  })

  const node = container?.querySelector('span')

  expect(node).toHaveAttribute('id', 'test-id')
  expect(node).toHaveClass('test-class')
})

test('renders default slot as node children', () => {
  runRenderFunction({
    as: 'div',
    props: {
      id: 'node-id',
    },
    children: () => [h('span', 'hello world!')],
  })

  const node = container?.querySelector('#node-id')
  expect(node?.innerHTML).toEqual('<span>hello world!</span>')
})

test('passes the childrenProps to children', () => {
  runRenderFunction({
    as: 'div',
    props: {
      id: 'node-id',
    },
    childrenProps: {
      id: 'child-id',
      class: 'child-class',
    },
    children: (props) => [h('span', props, 'hello world!')],
  })

  const child = container?.querySelector('#child-id')
  expect(child).toHaveClass('child-class')
})

test('can render a fragment', () => {
  const { container } = runRenderFunction({
    as: 'fragment',
  })

  expect(container.innerHTML).toEqual('<!---->')
})

test('passes the childrenProps to children when rendering as fragment', () => {
  runRenderFunction({
    as: 'fragment',
    childrenProps: {
      id: 'child-id',
      class: 'child-class',
    },
    children: (props) => [h('span', props, 'hello world!')],
  })

  const child = container?.querySelector('#child-id')
  expect(child).toHaveClass('child-class')
})
