import React, { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { InputContract } from '@harmonicui/contracts'
import { InputContextProvider } from '../../contexts'
import { suppressUnperformedContractWarning } from '../../test-utils'
import TextFieldInput from './TextFieldInput'

function renderTextFieldInputWithContextProvider (context: Partial<InputContract>) {
  function Provider () {
    return (
      <InputContextProvider value={context}>
        <TextFieldInput />
      </InputContextProvider>
    )
  }

  return render(<Provider/>)
}

function getInput () {
  return document.querySelector('input')
}

test('renders an input element',
  suppressUnperformedContractWarning(() => {
    render(<TextFieldInput/>)
    expect(getInput()).not.toBeNull()
  }),
)

test('consumes id from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ id: 'username' })
  expect(getInput()).toHaveAttribute('id', 'username')
})

test('does not render id attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    render(<TextFieldInput/>)
    expect(getInput()).not.toHaveAttribute('id')
  }),
)

test('consumes disabled from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ disabled: true })
  expect(getInput()).toBeDisabled()
})

test('does not render disabled attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    render(<TextFieldInput/>)
    expect(getInput()).not.toBeDisabled()
  }),
)

test('consumes required attribute from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ required: true })
  expect(getInput()).toBeRequired()
})

test('should not be required if not dictated by context', () => {
  renderTextFieldInputWithContextProvider({ required: false })
  expect(getInput()).not.toBeRequired()
})

test('is required by default',
  suppressUnperformedContractWarning(() => {
    render(<TextFieldInput/>)
    expect(getInput()).toBeRequired()
  }),
)

test('consumes aria-describedBy from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ 'aria-describedby': 'username-description' })
  expect(getInput()).toHaveAttribute('aria-describedBy', 'username-description')
})

test('does not render aria-describedBy attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    render(<TextFieldInput/>)
    expect(getInput()).not.toHaveAttribute('aria-describedBy')
  }),
)

test('consumes aria-errormessage from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ 'aria-errormessage': 'username-error' })
  expect(getInput()).toHaveAttribute('aria-errormessage', 'username-error')
})

test('does not render aria-errormessage attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    render(<TextFieldInput/>)
    expect(getInput()).not.toHaveAttribute('aria-errormessage')
  }),
)

test('consumes and updates the value provided through context', () => {
  function Provider () {
    const [value, setValue] = useState('hello world!')

    return (
      <InputContextProvider value={{
        value,
        setValue,
      }}>
        <TextFieldInput data-testid="input"/>
        <span data-testid="logger">{value}</span>
      </InputContextProvider>
    )
  }

  const { getByTestId } = render(<Provider/>)

  expect(getByTestId('logger')).toHaveTextContent('hello world!')
  expect(getInput()).toHaveValue('hello world!')

  fireEvent.change(getByTestId('input'), { target: { value: 'updated!' } })

  expect(getByTestId('logger')).toHaveTextContent('updated')
  expect(getInput()).toHaveValue('updated!')
})

test('consumes invalid state from context', () => {
  renderTextFieldInputWithContextProvider({
    'aria-invalid': true,
    value: 'hello',
  })
  expect(getInput()).toBeInvalid()
})

test('must be valid by default', () => {
  renderTextFieldInputWithContextProvider({ value: 'hello world!' })
  expect(getInput()).toBeValid()
})

test('forwards uncontrolled props to input element',
  suppressUnperformedContractWarning(() => {
    render(<TextFieldInput dir="rtl" name="username" data-test-id="test"/>)
    expect(getInput()).toHaveAttribute('dir', 'rtl')
    expect(getInput()).toHaveAttribute('name', 'username')
    expect(getInput()).toHaveAttribute('data-test-id', 'test')
  }),
)
