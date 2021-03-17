import { ErrorMessageContract } from '@harmonicui/contracts'
import { renderComponent, renderInlineComponent, suppressUnperformedContractWarning } from '../../test-utils'
import { provideErrorMessageContext } from '../../contexts'
import ErrorMessage from './ErrorMessage'

function getErrorMessage () {
  return document.querySelector('span')
}

function renderErrorMessageWithProvider (context: Partial<ErrorMessageContract>, defaultSlot = '') {
  renderInlineComponent({
    template: `
      <ErrorMessage>${defaultSlot}</ErrorMessage>`,
    components: { ErrorMessage },
    setup () {
      provideErrorMessageContext(context)
    },
  })
}

test('renders a span',
  suppressUnperformedContractWarning(() => {
    renderComponent(ErrorMessage)
    expect(getErrorMessage()).not.toBeNull()
  }),
)

test('renders children content',
  suppressUnperformedContractWarning(() => {
    renderInlineComponent({
      template: `
        <ErrorMessage>
        hello <span>world!</span>
        </ErrorMessage>
      `,
      components: { ErrorMessage },
    })
    expect(getErrorMessage()).toHaveTextContent('hello world!')
  }),
)

test('consumes message from ErrorMessageContext', () => {
  const message = 'Oops! something went wrong!'
  renderErrorMessageWithProvider({ message })
  expect(getErrorMessage()).toHaveTextContent(message)
})

test('children contents overrides the ErrorMessageContext.message', () => {
  const message = 'Oops! something went wrong!'
  renderErrorMessageWithProvider({ message }, 'hello <span>world!</span>')
  expect(getErrorMessage()).toHaveTextContent('hello world!')
})

test('consumes id from ErrorMessageContext', () => {
  renderErrorMessageWithProvider({ id: 'error-id' })
  expect(getErrorMessage()).toHaveAttribute('id', 'error-id')
})

test('does not render id if not provided through ErrorMessageContext', () => {
  renderErrorMessageWithProvider({})
  expect(getErrorMessage()).not.toHaveAttribute('id')
})

test('should be visible if context provides hidden = false', () => {
  renderErrorMessageWithProvider({ hidden: false })
  expect(getErrorMessage()).toBeVisible()
})

test('should not be visible if context provides hidden = true', () => {
  renderErrorMessageWithProvider({ hidden: true })
  expect(getErrorMessage()).not.toBeVisible()
})

test('forwards other props to span element',
  suppressUnperformedContractWarning(() => {
    renderComponent(ErrorMessage, {
      dir: 'rtl',
      lang: 'en',
      class: 'test',
    })

    expect(getErrorMessage()).toHaveAttribute('dir', 'rtl')
    expect(getErrorMessage()).toHaveAttribute('lang', 'en')
    expect(getErrorMessage()).toHaveClass('test')
  }),
)

test('user must not be able to modify controlled props', () => {
  renderInlineComponent({
    template: '<ErrorMessage id="user" hidden/>',
    components: { ErrorMessage },

    setup () {
      provideErrorMessageContext({
        id: 'context',
        hidden: false,
      })
    },
  })

  expect(getErrorMessage()).toHaveAttribute('id', 'context')
  expect(getErrorMessage()).toBeVisible()
})
