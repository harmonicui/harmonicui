import React, { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { AssertionsConfigurationOptions, TextFieldAssertions } from './Assertions'
import { TextField } from './TextField'

function getTextField () {
  return container.querySelector('div')
}

function renderAndRunAssertions (template: JSX.Element, assertionOptions: AssertionsConfigurationOptions = {}) {
  render(template)

  const assertions = new TextFieldAssertions(assertionOptions)
  assertions.runAllAssertions()
}

test('should have a proper name', () => {
  expect(TextField).toHaveBeenNamed('TextField')
})

describe('rendering', () => {
  test('should be a render-less component by default', () => {
    expect(TextField).toBeRenderLessComponent()
    expect(TextField).toRendersChildrenContent()
  })

  test('can be render as a div', () => {
    render(<TextField as="div">...</TextField>)

    expect(getTextField()).toBeInTheDocument()
    expect(getTextField()).toHaveTextContent('...')
  })

  test('forwards additional props to inner element if not rendered as fragment', () => {
    render(<TextField as="div" id="TextField" className="awesome"/>)

    expect(getTextField()).toHaveClass('awesome')
    expect(getTextField()).toHaveAttribute('id', 'TextField')
  })

  test('rendering with TextFieldInput, TextFieldLabel, TextFieldHelperText and TextFieldErrorMessage components', () => {
    renderAndRunAssertions(
      <TextField>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>)
  })
})

describe('states', () => {
  test('TextFieldInput can be optional', () => {
    renderAndRunAssertions(
      <TextField optional>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        states: ['optional'],
      })
  })

  test('TextFieldInput can be disabled', () => {
    renderAndRunAssertions(
      <TextField disabled>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        states: ['disabled'],
      })
  })

  test('TextFieldInput\'s value may invalid', () => {
    renderAndRunAssertions(
      <TextField invalid>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        states: ['invalid'],
      })
  })

  test('multiple states can be applied to TextFieldInput at the same time', () => {
    renderAndRunAssertions(
      <TextField invalid disabled optional>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        states: ['invalid', 'optional', 'disabled'],
      })
  })

  test('should expose state props through children render props', () => {
    const { getByTestId } = render(
      <TextField invalid disabled>
        {({
          disabled,
          optional,
          required,
          invalid,
        }) => (
          <>
            <span data-testid="disabled">{disabled.toString()}</span>
            <span data-testid="invalid">{invalid.toString()}</span>
            <span data-testid="required">{required.toString()}</span>
            <span data-testid="optional">{optional.toString()}</span>
          </>
        )}
      </TextField>,
    )

    expect(getByTestId('disabled')).toHaveTextContent('true')
    expect(getByTestId('invalid')).toHaveTextContent('true')
    expect(getByTestId('required')).toHaveTextContent('true')
    expect(getByTestId('optional')).toHaveTextContent('false')
  })
})

describe('controlling value', () => {
  test('shares and controls the value through TextFieldInput context', () => {
    let value
    let setValue: (newValue: string | number) => void

    function Wrapper () {
      [value, setValue] = useState<string | number>('Harmonic UI')

      return (
        <TextField value={value} onChange={(newValue: string | number) => setValue(newValue)}>
          <TextField.Label>Username</TextField.Label>
          <TextField.Input/>
        </TextField>
      )
    }

    const { getByLabelText } = render(<Wrapper/>)

    const input = getByLabelText('Username')
    expect(input).toHaveValue('Harmonic UI')

    fireEvent.input(input, { target: { value: 'updated!' } })

    expect(input).toHaveValue('updated!')
    expect(value).toEqual('updated!')
  })

  test('exposes a clear function through children props', () => {
    let value
    let setValue: (newValue: string | number) => void

    function Wrapper () {
      [value, setValue] = useState<string | number>('Harmonic UI')

      return (
        <TextField value={value} onChange={(newValue: string | number) => setValue(newValue)}>
          {({ clear }) => (
            <>
              <TextField.Label>Username</TextField.Label>
              <TextField.Input/>
              <button onClick={clear}>clear</button>
            </>
          )}
        </TextField>
      )
    }

    const {
      getByLabelText,
      getByText,
    } = render(<Wrapper/>)

    const input = getByLabelText('Username')
    const clearBtn = getByText('clear')
    expect(input).toHaveValue('Harmonic UI')

    fireEvent.click(clearBtn)

    expect(input).toHaveValue('')
    expect(value).toEqual('')
  })
})

describe('aria-* attributes', () => {
  test('TextFieldLabel loses for attribute if Input does not exists', () => {
    renderAndRunAssertions(
      <TextField>
        <TextField.Label>Username</TextField.Label>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        ignoreAssertions: ['Input'],
      })
  })

  test('TextFieldInput loses the aria-describedby attribute if HelperText does not exists', () => {
    renderAndRunAssertions(
      <TextField>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
      </TextField>
      , {
        ignoreAssertions: ['HelperText'],
      })
  })

  test('TextFieldInput loses the aria-errormessage attribute if ErrorMessage does not exists', () => {
    renderAndRunAssertions(
      <TextField invalid>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        states: ['invalid'],
        ignoreAssertions: ['ErrorMessage'],
      })
  })
})

describe('IDs', () => {
  test('generates a set of unique Ids for each instance', () => {
    render(
      <TextField>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>,
    )

    render(
      <TextField>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>,
    )

    const inputs = document.body.querySelectorAll('[id^="HUI-TextFieldInput-"]')
    const labels = document.body.querySelectorAll('[id^="HUI-TextFieldLabel-"]')
    const helperTexts = document.body.querySelectorAll('[id^="HUI-TextFieldHelperText-"]')
    const errorMessages = document.body.querySelectorAll('[id^="HUI-TextFieldErrorMessage-"]')

    expect(inputs.length).toEqual(2)
    expect(inputs[0].id).not.toEqual(inputs[1].id)

    expect(labels.length).toEqual(2)
    expect(labels[0].id).not.toEqual(labels[1].id)

    expect(helperTexts.length).toEqual(2)
    expect(helperTexts[0].id).not.toEqual(helperTexts[1].id)

    expect(errorMessages.length).toEqual(2)
    expect(errorMessages[0].id).not.toEqual(errorMessages[1].id)
  })

  test('TextFieldInput id should be overridable', () => {
    renderAndRunAssertions(
      <TextField inputId="input-id">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        id: { input: 'input-id' },
      })
  })

  test('TextFieldLabel id should be overridable', () => {
    renderAndRunAssertions(
      <TextField labelId="label-id">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        id: { label: 'label-id' },
      })
  })

  test('TextFieldHelperText id should be overridable', () => {
    renderAndRunAssertions(
      <TextField helperTextId="helper-text-id">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        id: { helperText: 'helper-text-id' },
      })
  })

  test('TextFieldErrorMessage id should be overridable', () => {
    renderAndRunAssertions(
      <TextField errorMessageId="error-message-id">
        <TextField.Label>Username</TextField.Label>
        <TextField.Input/>
        <TextField.ErrorMessage>Oops! something went wrong.</TextField.ErrorMessage>
        <TextField.HelperText>Something that might help!</TextField.HelperText>
      </TextField>
      , {
        id: { errorMessage: 'error-message-id' },
      })
  })
})
