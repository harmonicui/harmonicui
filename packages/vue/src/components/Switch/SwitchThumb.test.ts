import { renderInlineComponent } from '../../test-utils'
import { provideSwitchThumbContext, SwitchThumbContract } from '../../contexts'
import Thumb from './SwitchThumb'
import { computed } from '@vue/runtime-core'

function renderTemplate(
  template: string,
  contextValue: Partial<SwitchThumbContract> = {},
) {
  return renderInlineComponent({
    template,
    components: {
      Thumb,
    },
    setup() {
      provideSwitchThumbContext(contextValue as SwitchThumbContract)
    },
  })
}

function getThumb() {
  return container.querySelector('span')
}

test('should have a proper name', () => {
  expect(Thumb).toHaveBeenNamed('Thumb')
})

describe('rendering', () => {
  test('render an span element', () => {
    renderTemplate(`
      <Thumb />
    `)
    expect(getThumb()).toBeInTheDocument()
  })

  test('forwards attrs to the span element', () => {
    renderTemplate(`
      <Thumb dir="rtl" name="username" data-test-id="test-id" class="class-name" />
  `)

    expect(getThumb()).toHaveAttribute('dir', 'rtl')
    expect(getThumb()).toHaveAttribute('name', 'username')
    expect(getThumb()).toHaveAttribute('data-test-id', 'test-id')
    expect(getThumb()).toHaveClass('class-name')
  })

  test('renders default slot content inside Thumb element', () => {
    renderTemplate(`
      <Thumb>Username</Thumb>
    `)

    expect(getThumb()).toHaveTextContent('Username')
  })

  test('can be render as a div', () => {
    renderTemplate(`
      <Thumb as="div">
        Inner content!
      </Thumb>
    `)
    expect(container.querySelector('div')).not.toBeNull()
    expect(container.querySelector('div')).toHaveTextContent('Inner content!')
  })
})

describe('tabindex attribute', () => {
  test('consumes the tabindex provided from ThumbContext', () => {
    renderTemplate(
      `
      <Thumb />
    `,
      {
        tabindex: '-1',
      },
    )
    expect(getThumb()).toHaveAttribute('tabindex', '-1')
  })

  test('tabindex should not be overridable by user', () => {
    renderTemplate(
      `
      <Thumb tabindex='-1' />
    `,
      {
        tabindex: '1',
      },
    )

    expect(getThumb()).toHaveAttribute('tabindex', '1')
  })
})

describe('data-is attribute', () => {
  test('consumes the data-is provided from ThumbContext', () => {
    renderTemplate(
      `
      <Thumb />
    `,
      {
        'data-is': computed(() => 'on'),
      },
    )

    expect(getThumb()).toHaveAttribute('data-is', 'on')
  })

  test('data-is should not be overridable by user', () => {
    renderTemplate(
      `
      <Thumb data-is='off' />
    `,
      {
        'data-is': computed(() => 'on'),
      },
    )

    expect(getThumb()).toHaveAttribute('data-is', 'on')
  })
})
