import { ref } from 'vue'
import { renderInlineComponent } from '../../test-utils'
import { HelperTextContract, provideHelperTextContext } from '../../contexts'
import HelperText from './HelperText'

function getHelperText (element = 'div') {
  return container.querySelector(element)
}

function renderTemplate (template: string, contextValue: Partial<HelperTextContract> = {}) {
  return renderInlineComponent({
    template,
    components: { HelperText },
    setup () {
      provideHelperTextContext(contextValue as HelperTextContract)
    },
  })
}

test('should have a proper name', () => {
  expect(HelperText).toHaveBeenNamed('HelperText')
})

describe('rendering', () => {
  test('renders a div element by default', () => {
    renderTemplate(`
      <HelperText>
        Something that might help!
      </HelperText>
    `)

    expect(getHelperText()).toBeInTheDocument()
    expect(getHelperText()).toHaveTextContent('Something that might help!')
  })

  test('can be rendered as a span', () => {
    renderTemplate(`
      <HelperText as="span">
        Something that might help!
      </HelperText>
    `)

    expect(getHelperText('span')).toBeInTheDocument()
    expect(getHelperText('span')).toHaveTextContent('Something that might help!')
  })

  test('forwards uncontrolled props to the inner element', () => {
    renderTemplate(`
      <HelperText dir="rtl" data-test-id="test-id" class="class-name">
        Something that might help!
      </HelperText>
    `)

    expect(getHelperText()).toHaveClass('class-name')
    expect(getHelperText()).toHaveAttribute('dir', 'rtl')
    expect(getHelperText()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from HelperTextContext', () => {
  const templateRef = ref<HelperTextContract['ref']['value']>(null)

  renderTemplate(`
    <HelperText id="helper-id">
      Something that might help!
    </HelperText>
  `, {
    ref: templateRef,
  })

  expect(templateRef.value).not.toBeNull()
  expect(templateRef.value?.id).toEqual('helper-id')
})

describe('id attribute', () => {
  test('consumes id from HelperTextContext', () => {
    renderTemplate(`
    <HelperText>
      Something that might help!
    </HelperText>
  `, {
      id: 'helper-text-id',
    })

    expect(getHelperText()).toHaveAttribute('id', 'helper-text-id')
  })

  test('id should not be overridable by user', () => {
    renderTemplate(`
      <HelperText id="props">
        Something that might help!
      </HelperText>
    `, {
      id: 'context',
    })

    expect(getHelperText()).toHaveAttribute('id', 'context')
  })
})

describe('visibility control', () => {
  test('consumes hidden state from HelperTextContext', () => {
    renderTemplate(`
      <HelperText>
        Something that might help!
      </HelperText>
    `, {
      hidden: true,
    })

    expect(getHelperText()).not.toBeVisible()
  })

  test('visibility should not be controllable by user', () => {
    renderTemplate(`
      <HelperText hidden>
        Something that might help!
      </HelperText>
    `, {
      hidden: false,
    })

    expect(getHelperText()).toBeVisible()
  })
})
