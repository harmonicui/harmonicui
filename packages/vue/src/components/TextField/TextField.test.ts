import TextField from './TextField'
import { Component, defineComponent } from 'vue'
import { fireEvent } from '@testing-library/vue'
import { useInputContext } from '../../contexts'
import { DefaultSlot, setupContexts, DefaultSlotComponent, renderComponent } from '../../test-utils'

jest.mock('../../composables/useId')

const {
  LabelContext,
  InputContext,
  HelperTextContext,
  ErrorMessageContext,
} = setupContexts([
  'LabelContext',
  'InputContext',
  'HelperTextContext',
  'ErrorMessageContext',
])

function renderTextField (
  props?: Record<string, unknown>,
  defaultSlot?: string,
  components?: Record<string, Component>,
) {
  const requiredProps = { modelValue: '' }
  props = { ...requiredProps, ...props }

  defaultSlot = defaultSlot ?? `
     <template v-slot="props">
     <DefaultSlotComponent :slot-props="props"/>
     </template>
   `
  components = components ?? { DefaultSlotComponent }

  return renderComponent(TextField, props, defaultSlot, components)
}

test('should be a render-less component', () => {
  expect(TextField).toBeRenderLessComponent()
  expect(TextField).toRendersDefaultSlotContent()
})

test('generates an id for input field', () => {
  renderTextField()

  const id = 'HarmonicUI-TextField-Input-1'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates unique input id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-Input-1'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(InputContext)

  renderTextField()

  id = 'HarmonicUI-TextField-Input-2'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('input id can be overridden via props', () => {
  const id = 'username-input'

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

  const id = 'HarmonicUI-TextField-Label-1'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('generates a unique label id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-Label-1'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)

  renderTextField()

  id = 'HarmonicUI-TextField-Label-2'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('input id can be overridden via props', () => {
  const id = 'username-label'

  renderTextField({ labelId: id })

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('generates an id for error message', () => {
  renderTextField()

  const id = 'HarmonicUI-TextField-ErrorMessage-1'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates unique error message id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-ErrorMessage-1'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)

  renderTextField()

  id = 'HarmonicUI-TextField-ErrorMessage-2'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('error-message-id can be overridden via props', () => {
  const id = 'username-error-message'

  renderTextField({ errorMessageId: id })

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ 'aria-errormessage': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates an id for helper-text', () => {
  renderTextField()

  const id = 'HarmonicUI-TextField-HelperText-1'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('generates unique helper-text-id for each instance', () => {
  renderTextField()

  let id = 'HarmonicUI-TextField-HelperText-1'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)

  renderTextField()

  id = 'HarmonicUI-TextField-HelperText-2'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('error message id can be overridden via props', () => {
  const id = 'hint-message-id'

  renderTextField({ helperTextId: id })

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ 'aria-describedby': id })
    .toHaveBeenProvidedThrough(InputContext)
})

test('should handle v-model - provide value and updateValue through default slot', async () => {
  const {
    getByTestId,
    emitted,
  } = renderTextField(
    { modelValue: 'hello' },
    `
      <template v-slot="{ value, updateValue }">
        <input data-testId="SlotInput" :value="value" @input="updateValue($event.target.value)"/>
      </template>
    `,
  )

  const SlotInput = getByTestId('SlotInput')

  expect(SlotInput).toHaveValue('hello')
  expect(emitted()).toEqual({})

  await fireEvent.update(SlotInput, 'hello world!')

  expect(SlotInput).toHaveValue('hello world!')
  expect(emitted()).toEqual({ 'update:modelValue': [['hello world!']] })
})

test('should handle v-model - provide value and updateValue through InputContext', async () => {
  const InjectorComponent = defineComponent({
    template: `
      <input :value="value"
             data-testId="InjectorInput"
             @input="setValue($event.target.value)"
      />
    `,
    setup () {
      const {
        value,
        setValue,
      } = useInputContext()
      return {
        value,
        setValue,
      }
    },
  })

  const {
    getByTestId,
    emitted,
  } = renderTextField(
    { modelValue: 'hello' },
    '<InjectorComponent/>',
    { InjectorComponent },
  )

  const InjectorInput = getByTestId('InjectorInput')

  expect(InjectorInput).toHaveValue('hello')
  expect(emitted()).toEqual({})

  await fireEvent.update(InjectorInput, 'hello world!')

  expect(InjectorInput).toHaveValue('hello world!')
  expect(emitted()).toEqual({ 'update:modelValue': [['hello world!']] })
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

test('should not be disabled by default', () => {
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

test('exposes a clear method through default slot', async () => {
  const {
    getByText,
    emitted,
  } = renderTextField(
    {},
    `
      <template v-slot="{ clear }">
        <button @click="clear">clear</button>
      </template>
    `,
  )

  expect(emitted()).toEqual({})

  await fireEvent.click(getByText('clear'))

  expect(emitted()).toEqual({ 'update:modelValue': [['']] })
})
