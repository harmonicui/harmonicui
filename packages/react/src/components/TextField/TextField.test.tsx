import React, { useState } from 'react'
import { TextField } from './TextField'
import { fireEvent, render } from '@testing-library/react'
import { createContextTestingUtils } from '../../test-utils'
import { useInputContext } from '../../contexts'
import { TextFieldProps } from './types'

beforeEach(() => {
  jest.isolateModules(() => { require('@reach/auto-id') })
})

const {
  DefaultSlot,
  LabelContext,
  InputContext,
  ContextConsumer,
  ErrorMessageContext,
  HelperTextContext,
} = createContextTestingUtils([
  'LabelContext',
  'InputContext',
  'ErrorMessageContext',
  'HelperTextContext',
])

function renderTextField (props?: Partial<TextFieldProps>) {
  const requiredProps = {
    value: '',
    onChange: (): void => {
      //
    },
  }
  return render(
    <TextField {...{ ...requiredProps, ...props }}>
      {props => <ContextConsumer slotProps={{ ...props }}/>}
    </TextField>,
  )
}

test('should have a proper name', () => {
  expect(TextField).toHaveBeenNamed('TextField')
})

test('should be a render-less component', () => {
  expect(TextField).toBeRenderLessComponent()
  expect(TextField).toRendersDefaultSlotContent()
})

test('generates an id for input', () => {
  renderTextField()

  const id = 'HarmonicUI-TextField-Input-4'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates unique input-id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-Input-5'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(InputContext)

  renderTextField()

  id = 'HarmonicUI-TextField-Input-6'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('input id can be overridden via props', () => {
  const id = 'username'

  renderTextField({ id })

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates an id for label', () => {
  renderTextField()

  const id = 'HarmonicUI-TextField-Label-8'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('generates a unique label id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-Label-9'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)

  renderTextField()

  id = 'HarmonicUI-TextField-Label-10'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('input id can be overridden via props', () => {
  const id = 'username'

  renderTextField({ labelId: id })

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('generates an id for error message', () => {
  renderTextField()

  const id = 'HarmonicUI-TextField-ErrorMessage-12'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates unique error-message-id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-ErrorMessage-13'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)

  renderTextField()

  id = 'HarmonicUI-TextField-ErrorMessage-14'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('error-message-id can be overridden via props', () => {
  const id = 'username-error'

  renderTextField({ errorMessageId: id })

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates an id for hint message', () => {
  renderTextField()

  const id = 'HarmonicUI-TextField-HelperText-16'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates unique hint message id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-HelperText-17'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)

  renderTextField()

  id = 'HarmonicUI-TextField-HelperText-18'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('error message id can be overridden via props', () => {
  const id = 'username-hint-message'

  renderTextField({ helperTextId: id })

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('handles value and onChange passing through default slot', async () => {
  const Wrapper = (): React.ReactElement => {
    const [value, setValue] = useState('hello!')
    return (
      <>
        <TextField value={value} onChange={setValue}>
          {({
            updateValue,
            value,
          }) =>
            <input data-testid="input"
                   value={value}
                   onChange={event => updateValue(event.target.value)}/>
          }
        </TextField>
        <span data-testid="logger">{value}</span>
      </>
    )
  }

  const { getByTestId } = render(<Wrapper/>)

  const input = getByTestId('input')
  const logger = getByTestId('logger')

  expect(input).toHaveValue('hello!')
  expect(logger).toHaveTextContent('hello!')

  await fireEvent.change(input, {
    target: { value: 'hello world!' },
  })

  expect(input).toHaveValue('hello world!')
  expect(logger).toHaveTextContent('hello world!')
})

test('handles value and onChange passing through InputContext', async () => {
  function InputContextConsumer () {
    const {
      value,
      setValue,
    } = useInputContext()
    return <input data-testid="input" value={value} onChange={event => setValue?.(event.target.value)}/>
  }

  function Wrapper () {
    const [value, setValue] = useState('hello!')
    return (
      <>
        <TextField value={value} onChange={setValue}>
          <InputContextConsumer/>
        </TextField>
        <span data-testid="logger">{value}</span>
      </>
    )
  }

  const { getByTestId } = render(<Wrapper/>)

  const input = getByTestId('input')
  const logger = getByTestId('logger')

  expect(input).toHaveValue('hello!')
  expect(logger).toHaveTextContent('hello!')

  await fireEvent.change(input, {
    target: { value: 'hello world!' },
  })

  expect(input).toHaveValue('hello world!')
  expect(logger).toHaveTextContent('hello world!')
})

test('the input is required by default', () => {
  renderTextField()

  expect({
    optional: false,
    required: true,
  })
    .toHaveBeenProvidedThrough(DefaultSlot)

  expect({ optional: false })
    .toHaveBeenProvidedThrough(LabelContext)

  expect({ required: true })
    .toHaveBeenProvidedThrough(InputContext)
})

test('user can make input optional via prop', () => {
  renderTextField({ optional: true })

  expect({
    optional: true,
    required: false,
  })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ optional: true })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ required: false })
    .toHaveBeenProvidedThrough(InputContext)
})

test('should enabled by default', () => {
  renderTextField()

  expect({ disabled: false })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ disabled: false })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ disabled: false })
    .toHaveBeenProvidedThrough(InputContext)
})

test('the input can be disabled via prop', () => {
  renderTextField({ disabled: true })

  expect({ disabled: true })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ disabled: true })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ disabled: true })
    .toHaveBeenProvidedThrough(InputContext)
})

test('is valid by default', () => {
  renderTextField()

  expect({ invalid: false })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ invalid: false })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ 'aria-invalid': false })
    .toHaveBeenProvidedThrough(InputContext)
  expect({ hidden: true })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ hidden: false })
    .toHaveBeenProvidedThrough(HelperTextContext)
})

test('user can control validation state via error prop', () => {
  renderTextField({ error: true })

  expect({ invalid: true })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ invalid: true })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ 'aria-invalid': true })
    .toHaveBeenProvidedThrough(InputContext)
  expect({ hidden: false })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ hidden: true })
    .toHaveBeenProvidedThrough(HelperTextContext)
})

test('exposes the given error message', () => {
  const errorMessage = 'Whoops! something went wrong.'
  renderTextField({ errorMessage })

  expect({ errorMessage })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ message: errorMessage })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
})

test('exposes a clear method through default slot', () => {
  function Wrapper () {
    const [value, setValue] = useState('hello!')
    return (
      <>
        <TextField value={value} onChange={setValue}>
          {({ clear }) => <button data-testid="clear" onClick={clear}>clear</button>}
        </TextField>
        <span data-testid="logger">{value}</span>
      </>
    )
  }

  const { getByTestId } = render(<Wrapper/>)

  const clear = getByTestId('clear')
  const logger = getByTestId('logger')

  expect(logger).toHaveTextContent('hello!')

  fireEvent.click(clear)

  expect(logger).toHaveTextContent('')
})
