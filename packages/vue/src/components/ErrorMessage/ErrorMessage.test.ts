import { ref } from 'vue'
import { renderInlineComponent } from '../../test-utils'
import { ErrorMessageContract, provideErrorMessageContext } from '../../contexts'
import ErrorMessage from './ErrorMessage'

function getErrorMessage (element = 'div') {
  return container.querySelector(element)
}

function renderTemplate (template: string, contextValue: Partial<ErrorMessageContract> = {}) {
  return renderInlineComponent({
    template,
    components: { ErrorMessage },
    setup () {
      provideErrorMessageContext(contextValue as ErrorMessageContract)
    },
  })
}

test('should have a proper name', () => {
  expect(ErrorMessage).toHaveBeenNamed('ErrorMessage')
})

describe('rendering', () => {
  test('renders a div element by default', () => {
    renderTemplate(`
      <ErrorMessage>
        Oops! Something went wrong.
      </ErrorMessage>
    `)

    expect(getErrorMessage()).toBeInTheDocument()
    expect(getErrorMessage()).toHaveTextContent('Oops! Something went wrong.')
  })

  test('can be rendered as a span', () => {
    renderTemplate(`
      <ErrorMessage as="span">
        Oops! Something went wrong.
      </ErrorMessage>
    `)

    expect(getErrorMessage('span')).toBeInTheDocument()
    expect(getErrorMessage('span')).toHaveTextContent('Oops! Something went wrong.')
  })

  test('forwards uncontrolled props to the inner element', () => {
    renderTemplate(`
      <ErrorMessage dir="rtl" data-test-id="test-id" class="class-name">
        Oops! Something went wrong.
      </ErrorMessage>
    `)

    expect(getErrorMessage()).toHaveClass('class-name')
    expect(getErrorMessage()).toHaveAttribute('dir', 'rtl')
    expect(getErrorMessage()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from ErrorMessageContext', () => {
  const templateRef = ref<ErrorMessageContract['ref']['value']>(null)

  renderTemplate(`
    <ErrorMessage id="error-message-id">
      Oops! Something went wrong.
    </ErrorMessage>
  `, {
    ref: templateRef,
  })

  expect(templateRef.value).not.toBeNull()
  expect(templateRef.value?.id).toEqual('error-message-id')
})

describe('id attribute', () => {
  test('consumes id from ErrorMessageContext', () => {
    renderTemplate(`
    <ErrorMessage>
      Oops! Something went wrong.
    </ErrorMessage>
  `, {
      id: 'error-message-id',
    })

    expect(getErrorMessage()).toHaveAttribute('id', 'error-message-id')
  })

  test('id should not be overridable by user', () => {
    renderTemplate(`
      <ErrorMessage id="props">
        Oops! Something went wrong.
      </ErrorMessage>
    `, {
      id: 'context',
    })

    expect(getErrorMessage()).toHaveAttribute('id', 'context')
  })
})

describe('visibility control', () => {
  test('consumes hidden state from ErrorMessageContext', () => {
    renderTemplate(`
      <ErrorMessage>
        Oops! Something went wrong.
      </ErrorMessage>
    `, {
      hidden: true,
    })

    expect(getErrorMessage()).not.toBeVisible()
  })

  test('visibility should not be controllable by user', () => {
    renderTemplate(`
      <ErrorMessage hidden>
        Oops! Something went wrong.
      </ErrorMessage>
    `, {
      hidden: false,
    })

    expect(getErrorMessage()).toBeVisible()
  })
})
