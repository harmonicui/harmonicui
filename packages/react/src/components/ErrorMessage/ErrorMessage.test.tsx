import React, { useRef } from 'react'
import { render } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'
import {
  ErrorMessageContextProvider,
  ErrorMessageContract,
} from '../../contexts'

function getErrorMessage(element = 'div') {
  return container.querySelector(element)
}

test('should have a proper name', () => {
  expect(ErrorMessage).toHaveBeenNamed('ErrorMessage')
})

describe('rendering', () => {
  test('renders a div element by default', () => {
    render(
      <ErrorMessageContextProvider value={{} as ErrorMessageContract}>
        <ErrorMessage>Something that might help!</ErrorMessage>,
      </ErrorMessageContextProvider>,
    )

    expect(getErrorMessage()).toBeInTheDocument()
    expect(getErrorMessage()).toHaveTextContent('Something that might help!')
  })

  test('can be rendered as an arbitrary element', () => {
    render(
      <ErrorMessageContextProvider value={{} as ErrorMessageContract}>
        <ErrorMessage as="span">Something that might help!</ErrorMessage>,
      </ErrorMessageContextProvider>,
    )

    expect(getErrorMessage('span')).toBeInTheDocument()
    expect(getErrorMessage('span')).toHaveTextContent(
      'Something that might help!',
    )
  })

  test('forwards uncontrolled props to the inner element', () => {
    render(
      <ErrorMessageContextProvider value={{} as ErrorMessageContract}>
        <ErrorMessage dir="rtl" data-test-id="test-id" className="class-name">
          Something that might help!
        </ErrorMessage>
        ,
      </ErrorMessageContextProvider>,
    )

    expect(getErrorMessage()).toHaveClass('class-name')
    expect(getErrorMessage()).toHaveAttribute('dir', 'rtl')
    expect(getErrorMessage()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from ErrorMessageContext', () => {
  let ref: ErrorMessageContract['ref'] = { current: null }

  function Wrapper() {
    ref = useRef<ErrorMessageContract['ref']['current']>(null)

    return (
      <ErrorMessageContextProvider
        value={{ ref, id: 'error-id' } as ErrorMessageContract}
      >
        <ErrorMessage>Something that might help!</ErrorMessage>,
      </ErrorMessageContextProvider>
    )
  }

  render(<Wrapper />)

  expect(ref.current).not.toBeNull()
  expect(ref.current?.id).toEqual('error-id')
})

describe('id attribute', () => {
  test('consumes id from ErrorMessageContext', () => {
    render(
      <ErrorMessageContextProvider
        value={{ id: 'error-message-id' } as ErrorMessageContract}
      >
        <ErrorMessage>Something that might help!</ErrorMessage>,
      </ErrorMessageContextProvider>,
    )

    expect(getErrorMessage()).toHaveAttribute('id', 'error-message-id')
  })

  test('id should not be overridable by user', () => {
    render(
      <ErrorMessageContextProvider
        value={{ id: 'context' } as ErrorMessageContract}
      >
        <ErrorMessage id="props">Something that might help!</ErrorMessage>,
      </ErrorMessageContextProvider>,
    )

    expect(getErrorMessage()).toHaveAttribute('id', 'context')
  })
})

describe('visibility control', () => {
  test('consumes hidden state from ErrorMessageContext', () => {
    render(
      <ErrorMessageContextProvider
        value={{ hidden: true } as ErrorMessageContract}
      >
        <ErrorMessage>Something that might help!</ErrorMessage>,
      </ErrorMessageContextProvider>,
    )

    expect(getErrorMessage()).not.toBeVisible()
  })

  test('visibility should not be controllable by user', () => {
    render(
      <ErrorMessageContextProvider
        value={{ hidden: false } as ErrorMessageContract}
      >
        <ErrorMessage hidden>Something that might help!</ErrorMessage>,
      </ErrorMessageContextProvider>,
    )

    expect(getErrorMessage()).toBeVisible()
  })
})
