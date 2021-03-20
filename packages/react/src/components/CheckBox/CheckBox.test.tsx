import React from 'react'
import { CheckBox } from './CheckBox'
import { CheckBoxProps } from './types'
import { fireEvent, render } from '@testing-library/react'
import { createContextTestingUtils } from '../../test-utils'
import { useCheckBoxContext } from '../../contexts'

beforeEach(() => {
  jest.isolateModules(() => {
    require('@reach/auto-id')
  })
})
const {
  DefaultSlot,
  LabelContext,
  CheckBoxContext,
  ContextConsumer,
  HelperTextContext,
  ErrorMessageContext,
} = createContextTestingUtils([
  'LabelContext',
  'CheckBoxContext',
  'ErrorMessageContext',
  'HelperTextContext',
])

function renderCheckBox (props?: Partial<CheckBoxProps>) {
  const requiredProps = {
    checked: false,
    onClick: (): void => {
      //
    },
    onChange: (): void => {
      //
    },
    value: '',
  }
  return render(
    <CheckBox {...{ ...requiredProps, ...props }}>
      {(props) => <ContextConsumer slotProps={{ ...props }} />}
    </CheckBox>,
  )
}

test('should have a proper name.', () => {
  expect(CheckBox).toHaveBeenNamed('CheckBox')
})

test('should be a render-less component', () => {
  expect(CheckBox).toBeRenderLessComponent()
  expect(CheckBox).toRendersDefaultSlotContent()
})

test('generates id for CheckBox ', () => {
  renderCheckBox()

  const id = 'HarmonicUI-CheckBox-4'

  expect({ id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id }).toHaveBeenProvidedThrough(LabelContext)
  expect({ id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('should generate unique id for each instance of CheckBox.', () => {
  renderCheckBox()

  let id = 'HarmonicUI-CheckBox-5'

  expect({ id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id }).toHaveBeenProvidedThrough(LabelContext)
  expect({ id }).toHaveBeenProvidedThrough(CheckBoxContext)

  renderCheckBox()

  id = 'HarmonicUI-CheckBox-6'

  expect({ id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id }).toHaveBeenProvidedThrough(LabelContext)
  expect({ id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('should over-ride the id when it is provided', () => {
  const id = 'hello!'
  renderCheckBox({ id })

  expect({ id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id }).toHaveBeenProvidedThrough(LabelContext)
  expect({ id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('should generate id for label.', () => {
  const id = 'HarmonicUI-CheckBox-Label-8'

  renderCheckBox()

  expect({ labelId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(LabelContext)
})

test('should generates unique label id for each instance.', () => {
  let id = 'HarmonicUI-CheckBox-Label-9'

  renderCheckBox()

  expect({ labelId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(LabelContext)

  id = 'HarmonicUI-CheckBox-Label-10'

  renderCheckBox()

  expect({ labelId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(LabelContext)
})

test('Can over-ride the Checkbox id via props.', () => {
  const id = 'Checkbox-id'

  renderCheckBox({ labelId: id })

  expect({ labelId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(LabelContext)
})

test('Generates an id for error message', () => {
  const id = 'HarmonicUI-CheckBox-ErrorMessage-12'

  renderCheckBox()

  expect({ errorMessageId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('Generates unique id for each instance of error message', () => {
  let id = 'HarmonicUI-CheckBox-ErrorMessage-13'

  renderCheckBox()

  expect({ errorMessageId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id }).toHaveBeenProvidedThrough(CheckBoxContext)

  id = 'HarmonicUI-CheckBox-ErrorMessage-14'

  renderCheckBox()

  expect({ errorMessageId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('Error Message id can be over-ride via props.', () => {
  const id = 'error message'

  renderCheckBox({ errorMessageId: id })

  expect({ errorMessageId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('Generates id for helper text.', () => {
  renderCheckBox()

  const id = 'HarmonicUI-CheckBox-HelperText-16'

  expect({ helperTextId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('generates unique hint message id for each instance', () => {
  renderCheckBox()

  let id = 'HarmonicUI-CheckBox-HelperText-17'

  expect({ helperTextId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id }).toHaveBeenProvidedThrough(CheckBoxContext)

  renderCheckBox()

  id = 'HarmonicUI-CheckBox-HelperText-18'

  expect({ helperTextId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('error message id can be overridden via props', () => {
  const id = 'hint-message'

  renderCheckBox({ helperTextId: id })

  expect({ helperTextId: id }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id }).toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('handleschecked and onChange passing through default slot', async () => {
  const Wrapper = (): React.ReactElement => {
    const [checked, setCheck] = React.useState(false)
    return (
      <>
        <CheckBox
          checked={checked}
          onClick={setCheck}
          value=""
          onChange={(t) => t}
        >
          {({ updateChecked, checked }) => (
            <input
              type="checkbox"
              data-testid="checkbox"
              checked={checked}
              onChange={(event) => updateChecked(event.currentTarget.checked)}
            />
          )}
        </CheckBox>
        <span data-testid="logger">{checked ? 'true' : 'false'}</span>
      </>
    )
  }

  const { getByTestId } = render(<Wrapper />)

  const checkbox = getByTestId('checkbox')
  const logger = getByTestId('logger')

  expect(logger).toHaveTextContent('false')
  expect(checkbox).not.toBeChecked()

  await fireEvent.click(checkbox)

  expect(logger).toHaveTextContent('true')
  expect(checkbox).toBeChecked()
})

test('Handles value provided through CheckBoxContext.', async () => {
  function CheckBoxContentConsumer () {
    const { updateValue } = useCheckBoxContext()

    return (
      <input
        type="checkbox"
        value="value"
        data-testid="checkbox"
        onClick={(event) => updateValue?.(event.currentTarget.value)}
      />
    )
  }

  function Wrapper () {
    const [value, setValue] = React.useState('checkbox')

    return (
      <>
        <CheckBox onChange={setValue} value={value} onClick={(t) => t}>
          <CheckBoxContentConsumer />
        </CheckBox>
        <span data-testid="logger">{value}</span>
      </>
    )
  }

  const { getByTestId } = render(<Wrapper />)
  const checkbox = getByTestId('checkbox')
  const logger = getByTestId('logger')

  expect(checkbox).not.toBeChecked()
  expect(logger).toHaveTextContent('checkbox')

  await fireEvent.click(checkbox)

  expect(checkbox).toBeChecked()
  expect(logger).toHaveTextContent('value')
})

test('CheckBox is required by default.', () => {
  renderCheckBox()

  expect({ optional: false, required: true }).toHaveBeenProvidedThrough(DefaultSlot)

  expect({ optional: false }).toHaveBeenProvidedThrough(LabelContext)

  expect({ required: true }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('User can make the CheckBox optional via props.', () => {
  renderCheckBox({ optional: true })

  expect({ optional: true, required: false }).toHaveBeenProvidedThrough(DefaultSlot)

  expect({ optional: true }).toHaveBeenProvidedThrough(LabelContext)

  expect({ required: false }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('CheckBox is Enabled by default.', () => {
  renderCheckBox()

  expect({ disabled: false }).toHaveBeenProvidedThrough(DefaultSlot)

  expect({ disabled: false }).toHaveBeenProvidedThrough(LabelContext)

  expect({ disabled: false }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('CheckBox can be disabled via props.', () => {
  renderCheckBox({ disabled: true })

  expect({ disabled: true }).toHaveBeenProvidedThrough(DefaultSlot)

  expect({ disabled: true }).toHaveBeenProvidedThrough(LabelContext)

  expect({ disabled: true }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('CheckBox is unchecked by default.', () => {
  renderCheckBox()

  expect({ checked: false }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ checked: false }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('CheckBox can be checked via props.', () => {
  renderCheckBox({ checked: true })

  expect({ checked: true }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ checked: true }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('CheckBox can be given value via props.', () => {
  renderCheckBox({ value: 'UserName' })

  expect({ value: 'UserName' }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ value: 'UserName' }).toHaveBeenProvidedThrough(CheckBoxContext)
})

test('is valid by default', () => {
  renderCheckBox()

  expect({ invalid: false }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ invalid: false }).toHaveBeenProvidedThrough(LabelContext)
  expect({ invalid: false }).toHaveBeenProvidedThrough(CheckBoxContext)
  expect({ hidden: true }).toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ hidden: true }).toHaveBeenProvidedThrough(HelperTextContext)
})

test('user can control validation state via error prop', () => {
  renderCheckBox({ error: true })

  expect({ invalid: true }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ invalid: true }).toHaveBeenProvidedThrough(LabelContext)
  expect({ invalid: true }).toHaveBeenProvidedThrough(CheckBoxContext)
  expect({ hidden: false }).toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ hidden: false }).toHaveBeenProvidedThrough(HelperTextContext)
})

test('exposes the given error message', () => {
  const errorMessage = 'Whoops! something went wrong.'
  renderCheckBox({ errorMessage })

  expect({ errorMessage }).toHaveBeenProvidedThrough(DefaultSlot)
  expect({ message: errorMessage }).toHaveBeenProvidedThrough(ErrorMessageContext)
})
