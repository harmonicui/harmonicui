import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ErrorMessageContract } from '@harmonicui/contracts'
import { ErrorMessageContextProvider } from '../../contexts'
import { suppressUnperformedContractWarning } from '../../test-utils'
import ErrorMessage from './ErrorMessage'

function getErrorMessage () {
  return document.querySelector('span')
}

function renderErrorMessageWithProvider (context: Partial<ErrorMessageContract>, children?: ReactElement) {
  function Provider () {
    return (
      <ErrorMessageContextProvider value={context}>
        <ErrorMessage>
          {children}
        </ErrorMessage>
      </ErrorMessageContextProvider>
    )
  }

  return render(<Provider/>)
}

test('renders a span',
  suppressUnperformedContractWarning(() => {
    render(<ErrorMessage/>)
    expect(getErrorMessage()).not.toBeNull()
  }),
)

test('renders children content',
  suppressUnperformedContractWarning(() => {
    render(
      <ErrorMessage>
        hello <span>world!</span>
      </ErrorMessage>,
    )
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
  renderErrorMessageWithProvider({ message }, <>hello <span>world!</span></>)
  expect(getErrorMessage()).toHaveTextContent('hello world!')
})

test('consumes id from ErrorMessageContext', () => {
  renderErrorMessageWithProvider({ id: 'error-id' })
  expect(getErrorMessage()).toHaveAttribute('id', 'error-id')
})

test('does not render id if not provided through ErrorMessageContext',
  suppressUnperformedContractWarning(() => {
    renderErrorMessageWithProvider({})
    expect(getErrorMessage()).not.toHaveAttribute('id')
  }),
)

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
    render(<ErrorMessage dir="rtl" lang="en" className="test"/>)
    expect(getErrorMessage()).toHaveAttribute('dir', 'rtl')
    expect(getErrorMessage()).toHaveAttribute('lang', 'en')
    expect(getErrorMessage()).toHaveClass('test')
  }),
)
