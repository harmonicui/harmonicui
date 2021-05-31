import React, { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import {
  AssertionsConfigurationOptions,
  CheckBoxAssertions,
} from './Assertions'
import { CheckBox } from './CheckBox'

function getCheckBox() {
  return container.querySelector('div')
}

function renderAndRunAssertions(
  template: JSX.Element,
  assertionOptions: AssertionsConfigurationOptions = {},
) {
  render(template)

  const assertions = new CheckBoxAssertions(assertionOptions)
  assertions.runAllAssertions()
}

test('should have a proper name', () => {
  expect(CheckBox).toHaveBeenNamed('CheckBox')
})

describe('rendering', () => {
  test('should be a render-less component by default', () => {
    expect(CheckBox).toBeRenderLessComponent()
    expect(CheckBox).toRendersChildrenContent()
  })

  test('can be render as a div', () => {
    render(<CheckBox as="div">...</CheckBox>)

    expect(getCheckBox()).toBeInTheDocument()
    expect(getCheckBox()).toHaveTextContent('...')
  })

  test('forwards additional props to inner element if not rendered as fragment', () => {
    render(<CheckBox as="div" id="CheckBox" className="awesome" />)

    expect(getCheckBox()).toHaveClass('awesome')
    expect(getCheckBox()).toHaveAttribute('id', 'CheckBox')
  })

  test('rendering with CheckBoxInput, CheckBoxLabel, CheckBoxHelperText and CheckBoxErrorMessage components', () => {
    renderAndRunAssertions(
      <CheckBox>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
    )
  })
})

describe('states', () => {
  test('CheckBoxInput can be optional', () => {
    renderAndRunAssertions(
      <CheckBox optional>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        states: ['optional'],
      },
    )
  })

  test('CheckBoxInput can be disabled', () => {
    renderAndRunAssertions(
      <CheckBox disabled>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        states: ['disabled'],
      },
    )
  })

  test('CheckBoxInput can be indeterminate', () => {
    renderAndRunAssertions(
      <CheckBox indeterminate>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        states: ['indeterminate'],
      },
    )
  })

  test("CheckBoxInput's value may invalid", () => {
    renderAndRunAssertions(
      <CheckBox invalid>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        states: ['invalid'],
      },
    )
  })

  test('multiple states can be applied to CheckBoxInput at the same time', () => {
    renderAndRunAssertions(
      <CheckBox invalid disabled optional indeterminate>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        states: ['invalid', 'optional', 'disabled', 'indeterminate'],
      },
    )
  })

  test('should expose state props through children render props', () => {
    const { getByTestId } = render(
      <CheckBox invalid disabled>
        {({ disabled, optional, required, invalid }) => (
          <>
            <span data-testid="disabled">{disabled.toString()}</span>
            <span data-testid="invalid">{invalid.toString()}</span>
            <span data-testid="required">{required.toString()}</span>
            <span data-testid="optional">{optional.toString()}</span>
          </>
        )}
      </CheckBox>,
    )

    expect(getByTestId('disabled')).toHaveTextContent('true')
    expect(getByTestId('invalid')).toHaveTextContent('true')
    expect(getByTestId('required')).toHaveTextContent('true')
    expect(getByTestId('optional')).toHaveTextContent('false')
  })
})

describe('controlling value', () => {
  test('shares and controls the value through CheckBoxInput context', () => {
    let checked
    let toggleValue: (newValue: boolean) => void

    function Wrapper() {
      ;[checked, toggleValue] = useState<boolean>(true)

      return (
        <CheckBox
          checked={checked}
          onChange={(newValue: boolean) => toggleValue(newValue)}
        >
          <CheckBox.Label>Username</CheckBox.Label>
          <CheckBox.Input />
        </CheckBox>
      )
    }

    const { getByLabelText } = render(<Wrapper />)

    const input = getByLabelText('Username')
    expect(input).toBeChecked()
    expect(checked).toEqual(true)

    fireEvent.click(input)

    expect(input).not.toBeChecked()
    expect(checked).toEqual(false)
  })
})

describe('aria-* attributes', () => {
  test('CheckBoxLabel loses for attribute if Input does not exists', () => {
    renderAndRunAssertions(
      <CheckBox>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        ignoreAssertions: ['Input'],
      },
    )
  })

  test('CheckBoxInput loses the aria-describedby attribute if HelperText does not exists', () => {
    renderAndRunAssertions(
      <CheckBox>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
      </CheckBox>,
      {
        ignoreAssertions: ['HelperText'],
      },
    )
  })

  test('CheckBoxInput loses the aria-errormessage attribute if ErrorMessage does not exists', () => {
    renderAndRunAssertions(
      <CheckBox invalid>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        states: ['invalid'],
        ignoreAssertions: ['ErrorMessage'],
      },
    )
  })
})

describe('IDs', () => {
  test('generates a set of unique Ids for each instance', () => {
    render(
      <CheckBox>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
    )

    render(
      <CheckBox>
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
    )

    const inputs = document.body.querySelectorAll('[id^="HUI-CheckBoxInput-"]')
    const labels = document.body.querySelectorAll('[id^="HUI-CheckBoxLabel-"]')
    const helperTexts = document.body.querySelectorAll(
      '[id^="HUI-CheckBoxHelperText-"]',
    )
    const errorMessages = document.body.querySelectorAll(
      '[id^="HUI-CheckBoxErrorMessage-"]',
    )

    expect(inputs.length).toEqual(2)
    expect(inputs[0].id).not.toEqual(inputs[1].id)

    expect(labels.length).toEqual(2)
    expect(labels[0].id).not.toEqual(labels[1].id)

    expect(helperTexts.length).toEqual(2)
    expect(helperTexts[0].id).not.toEqual(helperTexts[1].id)

    expect(errorMessages.length).toEqual(2)
    expect(errorMessages[0].id).not.toEqual(errorMessages[1].id)
  })

  test('CheckBoxInput id should be overridable', () => {
    renderAndRunAssertions(
      <CheckBox inputId="input-id">
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        id: { input: 'input-id' },
      },
    )
  })

  test('CheckBoxLabel id should be overridable', () => {
    renderAndRunAssertions(
      <CheckBox labelId="label-id">
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        id: { label: 'label-id' },
      },
    )
  })

  test('CheckBoxHelperText id should be overridable', () => {
    renderAndRunAssertions(
      <CheckBox helperTextId="helper-text-id">
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        id: { helperText: 'helper-text-id' },
      },
    )
  })

  test('CheckBoxErrorMessage id should be overridable', () => {
    renderAndRunAssertions(
      <CheckBox errorMessageId="error-message-id">
        <CheckBox.Label>Username</CheckBox.Label>
        <CheckBox.Input />
        <CheckBox.ErrorMessage>
          Oops! something went wrong.
        </CheckBox.ErrorMessage>
        <CheckBox.HelperText>Something that might help!</CheckBox.HelperText>
      </CheckBox>,
      {
        id: { errorMessage: 'error-message-id' },
      },
    )
  })
})
