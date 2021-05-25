import React, { useRef, useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import {
  TextFieldInputContextProvider,
  TextFieldInputContract,
} from '../../contexts'
import { TextFieldInput } from './TextFieldInput'

function getInput() {
  return container.querySelector('input')
}

test('should have a proper name', () => {
  expect(TextFieldInput).toHaveBeenNamed('TextFieldInput')
})

describe('rendering', () => {
  test('renders an input element by default', () => {
    render(
      <TextFieldInputContextProvider value={{} as TextFieldInputContract}>
        <TextFieldInput />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toBeInTheDocument()
  })

  test('can be rendered as any element/component', () => {
    function CustomInput() {
      return <input name="custom-input" />
    }

    render(
      <TextFieldInputContextProvider value={{} as TextFieldInputContract}>
        <TextFieldInput as={CustomInput} />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toBeInTheDocument()
    expect(getInput()).toHaveAttribute('name', 'custom-input')
  })

  test('forwards attrs to the input element', () => {
    render(
      <TextFieldInputContextProvider value={{} as TextFieldInputContract}>
        <TextFieldInput
          dir="rtl"
          name="username"
          data-test-id="test-id"
          className="class-name"
        />
        ,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveClass('class-name')
    expect(getInput()).toHaveAttribute('dir', 'rtl')
    expect(getInput()).toHaveAttribute('name', 'username')
    expect(getInput()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from TextFieldInputContext', () => {
  let ref: TextFieldInputContract['ref'] = { current: null }

  function Wrapper() {
    ref = useRef<TextFieldInputContract['ref']['current']>(null)

    return (
      <TextFieldInputContextProvider
        value={
          {
            ref,
            id: 'input-id',
          } as TextFieldInputContract
        }
      >
        <TextFieldInput />,
      </TextFieldInputContextProvider>
    )
  }

  render(<Wrapper />)

  expect(ref.current).not.toBeNull()
  expect(ref.current?.id).toEqual('input-id')
})

test('consumes and updates the value provided by the TextFieldInputContext', () => {
  let value
  let setValue: (newValue: string | number) => void

  function Wrapper() {
    ;[value, setValue] = useState<string | number>('Harmonic UI')

    return (
      <TextFieldInputContextProvider
        value={
          {
            value,
            setValue,
          } as TextFieldInputContract
        }
      >
        <TextFieldInput data-testid="input" />
      </TextFieldInputContextProvider>
    )
  }

  const { getByTestId } = render(<Wrapper />)

  expect(getInput()).toHaveValue('Harmonic UI')

  fireEvent.input(getByTestId('input'), { target: { value: 'updated!' } })

  expect(value).toEqual('updated!')
  expect(getInput()).toHaveValue('updated!')
})

describe('id attribute', () => {
  test('consumes the id provided from TextFieldInputContext', () => {
    render(
      <TextFieldInputContextProvider
        value={{ id: 'input-id' } as TextFieldInputContract}
      >
        <TextFieldInput />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('id', 'input-id')
  })

  test('id should not be overridable by user', () => {
    render(
      <TextFieldInputContextProvider
        value={{ id: 'context' } as TextFieldInputContract}
      >
        <TextFieldInput id="props" />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('id', 'context')
  })
})

describe('disabled attribute', () => {
  test('consumes disabled attribute from TextFieldInputContext', () => {
    render(
      <TextFieldInputContextProvider
        value={{ disabled: true } as TextFieldInputContract}
      >
        <TextFieldInput />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toBeDisabled()
  })

  test('disabled attribute should not be overridable by user', () => {
    render(
      <TextFieldInputContextProvider
        value={{ disabled: false } as TextFieldInputContract}
      >
        <TextFieldInput disabled />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).not.toBeDisabled()
  })
})

describe('required attribute', () => {
  test('consumes required attribute from TextFieldInputContext', () => {
    render(
      <TextFieldInputContextProvider
        value={{ required: true } as TextFieldInputContract}
      >
        <TextFieldInput />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toBeRequired()
  })

  test('required attribute should not be overridable by user', () => {
    render(
      <TextFieldInputContextProvider
        value={{ required: false } as TextFieldInputContract}
      >
        <TextFieldInput required />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).not.toBeRequired()
  })
})

describe('aria-* attributes', () => {
  test('consumes aria-invalid attribute from TextFieldInputContext', () => {
    render(
      <TextFieldInputContextProvider
        value={{ 'aria-invalid': true } as TextFieldInputContract}
      >
        <TextFieldInput />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-invalid')
  })

  test('aria-invalid attribute should not be overridable by user', () => {
    render(
      <TextFieldInputContextProvider
        value={{ 'aria-invalid': undefined } as TextFieldInputContract}
      >
        <TextFieldInput aria-invalid={true} />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).not.toHaveAttribute('aria-invalid')
  })

  test('consumes aria-errormessage attribute from TextFieldInputContext', () => {
    render(
      <TextFieldInputContextProvider
        value={
          { 'aria-errormessage': 'errormessage-id' } as TextFieldInputContract
        }
      >
        <TextFieldInput />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-errormessage', 'errormessage-id')
  })

  test('aria-errormessage attribute should not be overridable by user', () => {
    render(
      <TextFieldInputContextProvider
        value={{ 'aria-errormessage': 'context' } as TextFieldInputContract}
      >
        <TextFieldInput aria-errormessage="props" />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-errormessage', 'context')
  })

  test('consumes aria-describedby attribute from TextFieldInputContext', () => {
    render(
      <TextFieldInputContextProvider
        value={
          { 'aria-describedby': 'description-id' } as TextFieldInputContract
        }
      >
        <TextFieldInput />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-describedby', 'description-id')
  })

  test('aria-describedby attribute should not be overridable by user', () => {
    render(
      <TextFieldInputContextProvider
        value={{ 'aria-describedby': 'context' } as TextFieldInputContract}
      >
        <TextFieldInput aria-describedby="props" />,
      </TextFieldInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-describedby', 'context')
  })
})
