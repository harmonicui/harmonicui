import React, { useRef, useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import {
  CheckBoxInputContextProvider,
  CheckBoxInputContract,
} from '../../contexts'
import { CheckBoxInput } from './CheckBoxInput'

function getInput() {
  return container.querySelector('input')
}

test('should have a proper name', () => {
  expect(CheckBoxInput).toHaveBeenNamed('CheckBoxInput')
})

test('must be a checkBox', () => {
  render(
    <CheckBoxInputContextProvider value={{} as CheckBoxInputContract}>
      <CheckBoxInput />,
    </CheckBoxInputContextProvider>,
  )

  expect(getInput()).toHaveAttribute('type', 'checkbox')
})

describe('rendering', () => {
  test('render a input element by default', () => {
    render(
      <CheckBoxInputContextProvider value={{} as CheckBoxInputContract}>
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toBeInTheDocument()
  })

  test('can be rendered as any element/component', () => {
    function CustomInput() {
      return <input type="checkbox" name="custom-input" />
    }

    render(
      <CheckBoxInputContextProvider value={{} as CheckBoxInputContract}>
        <CheckBoxInput as={CustomInput} />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toBeInTheDocument()
    expect(getInput()).toHaveAttribute('name', 'custom-input')
  })

  test('forwards attrs to the input element', () => {
    render(
      <CheckBoxInputContextProvider value={{} as CheckBoxInputContract}>
        <CheckBoxInput
          dir="rtl"
          name="username"
          data-test-id="test-id"
          className="class-name"
        />
        ,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveClass('class-name')
    expect(getInput()).toHaveAttribute('dir', 'rtl')
    expect(getInput()).toHaveAttribute('name', 'username')
    expect(getInput()).toHaveAttribute('data-test-id', 'test-id')
  })
})

test('consumes ref from CheckBoxInputContext', () => {
  let ref: CheckBoxInputContract['ref'] = { current: null }

  function Wrapper() {
    ref = useRef<CheckBoxInputContract['ref']['current']>(null)

    return (
      <CheckBoxInputContextProvider
        value={
          {
            ref,
            id: 'input-id',
          } as CheckBoxInputContract
        }
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>
    )
  }

  render(<Wrapper />)

  expect(ref.current).not.toBeNull()
  expect(ref.current?.id).toEqual('input-id')
})

test('consumes and updates the checked provided by the CheckBoxInputContext', () => {
  let checked = true
  let toggleValue = (value: boolean) => {
    checked = value
  }

  function Wrapper() {
    ;[checked, toggleValue] = useState<boolean>(true)

    return (
      <CheckBoxInputContextProvider
        value={
          {
            checked,
            toggleValue,
          } as CheckBoxInputContract
        }
      >
        <CheckBoxInput data-testid="input" />
      </CheckBoxInputContextProvider>
    )
  }

  const { getByTestId } = render(<Wrapper />)

  expect(getInput()).toBeChecked()

  fireEvent.click(getByTestId('input'))

  expect(checked).toEqual(false)
  expect(getInput()).not.toBeChecked()

  fireEvent.click(getByTestId('input'))

  expect(checked).toEqual(true)
  expect(getInput()).toBeChecked()
})

describe('id attribute', () => {
  test('consumes the id provided from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ id: 'input-id' } as CheckBoxInputContract}
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('id', 'input-id')
  })

  test('id should not be overridable by user', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ id: 'context' } as CheckBoxInputContract}
      >
        <CheckBoxInput id="props" />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('id', 'context')
  })
})

describe('disabled attribute', () => {
  test('consumes disabled attribute from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ disabled: true } as CheckBoxInputContract}
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toBeDisabled()
  })

  test('disabled attribute should not be overridable by user', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ disabled: false } as CheckBoxInputContract}
      >
        <CheckBoxInput disabled />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).not.toBeDisabled()
  })
})

describe('required attribute', () => {
  test('consumes required attribute from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ required: true } as CheckBoxInputContract}
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toBeRequired()
  })

  test('required attribute should not be overridable by user', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ required: false } as CheckBoxInputContract}
      >
        <CheckBoxInput required />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).not.toBeRequired()
  })
})

describe('checked attribute', () => {
  test('consumes checked attribute from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ checked: true } as CheckBoxInputContract}
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toBeChecked()
  })

  test('checked attribute should not be overridable by user', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ checked: false } as CheckBoxInputContract}
      >
        <CheckBoxInput checked />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).not.toBeChecked()
  })
})

describe('indeterminate attribute', () => {
  test('consumes indeterminate attribute from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ indeterminate: true } as CheckBoxInputContract}
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )
    expect(getInput()).toHaveAttribute('indeterminate.prop', 'true')
  })
})

describe('aria-* attributes', () => {
  test('consumes aria-invalid attribute from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ 'aria-invalid': true } as CheckBoxInputContract}
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-invalid')
  })

  test('aria-invalid attribute should not be overridable by user', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ 'aria-invalid': undefined } as CheckBoxInputContract}
      >
        <CheckBoxInput aria-invalid={true} />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).not.toHaveAttribute('aria-invalid')
  })

  test('consumes aria-errormessage attribute from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={
          { 'aria-errormessage': 'errormessage-id' } as CheckBoxInputContract
        }
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-errormessage', 'errormessage-id')
  })

  test('aria-errormessage attribute should not be overridable by user', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ 'aria-errormessage': 'context' } as CheckBoxInputContract}
      >
        <CheckBoxInput aria-errormessage="props" />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-errormessage', 'context')
  })

  test('consumes aria-describedby attribute from CheckBoxInputContext', () => {
    render(
      <CheckBoxInputContextProvider
        value={
          { 'aria-describedby': 'description-id' } as CheckBoxInputContract
        }
      >
        <CheckBoxInput />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-describedby', 'description-id')
  })

  test('aria-describedby attribute should not be overridable by user', () => {
    render(
      <CheckBoxInputContextProvider
        value={{ 'aria-describedby': 'context' } as CheckBoxInputContract}
      >
        <CheckBoxInput aria-describedby="props" />,
      </CheckBoxInputContextProvider>,
    )

    expect(getInput()).toHaveAttribute('aria-describedby', 'context')
  })
})
