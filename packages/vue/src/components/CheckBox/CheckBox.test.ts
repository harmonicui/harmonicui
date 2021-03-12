import CheckBox from './CheckBox'
import { Component, defineComponent } from 'vue'
import { fireEvent } from '@testing-library/vue'
import { useCheckBoxContext } from '../../contexts'
import { DefaultSlot, setupContexts, DefaultSlotComponent, renderComponent } from '../../test-utils'

jest.mock('../../composables/useId')

const {
  LabelContext,
  CheckBoxContext,
  HelperTextContext,
  ErrorMessageContext,
} = setupContexts([
  'LabelContext',
  'CheckBoxContext',
  'HelperTextContext',
  'ErrorMessageContext',
])

function renderCheckBox (
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

  return renderComponent(CheckBox, props, defaultSlot, components)
}

test('should be a render-less component', () => {
  expect(CheckBox).toBeRenderLessComponent()
  expect(CheckBox).toRendersDefaultSlotContent()
})

test('generates an id for CheckBox field', () => {
  renderCheckBox()

  const id = 'HarmonicUI-CheckBox-CheckBox-1'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('generate unique checkBox id for each instance', () => {
  renderCheckBox()

  let id = 'HarmonicUI-CheckBox-CheckBox-1'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(CheckBoxContext)

  renderCheckBox()

  id = 'HarmonicUI-CheckBox-CheckBox-2'

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('CheckBox id can be overridden via props', () => {
  const id = 'username-CheckBox'

  renderCheckBox({ id })

  expect({ id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ htmlFor: id })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('generates an id for label', () => {
  renderCheckBox()

  const id = 'HarmonicUI-CheckBox-Label-1'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('generates a unique label id for each instance', () => {
  renderCheckBox()

  let id = 'HarmonicUI-CheckBox-Label-1'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)

  renderCheckBox()

  id = 'HarmonicUI-CheckBox-Label-2'

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('Label id can be overridden via props', () => {
  const id = 'username-label'

  renderCheckBox({ labelId: id })

  expect({ labelId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(LabelContext)
})

test('generates an id for error message', () => {
  renderCheckBox()

  const id = 'HarmonicUI-CheckBox-ErrorMessage-1'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('generates unique error message id for each instance', () => {
  renderCheckBox()

  let id = 'HarmonicUI-CheckBox-ErrorMessage-1'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)

  renderCheckBox()

  id = 'HarmonicUI-CheckBox-ErrorMessage-2'

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('error-message-id can be overridden via props', () => {
  const id = 'username-error-message'

  renderCheckBox({ errorMessageId: id })

  expect({ errorMessageId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ ariaErrormessage: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('generates an id for helper-text', () => {
  renderCheckBox()

  const id = 'HarmonicUI-CheckBox-HelperText-1'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('generates unique helper-text-id for each instance', () => {
  renderCheckBox()

  let id = 'HarmonicUI-CheckBox-HelperText-1'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)

  renderCheckBox()

  id = 'HarmonicUI-CheckBox-HelperText-2'

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('HelperText id can be overridden via props', () => {
  const id = 'hint-message-id'

  renderCheckBox({ helperTextId: id })

  expect({ helperTextId: id })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ id })
    .toHaveBeenProvidedThrough(HelperTextContext)
  expect({ ariaDescribedby: id })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('the CheckBox is required by default', () => {
  renderCheckBox()

  expect({ optional: false, required: true })
    .toHaveBeenProvidedThrough(DefaultSlot)

  expect({ optional: false })
    .toHaveBeenProvidedThrough(LabelContext)

  expect({ required: true })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('user can make CheckBox optional via prop', () => {
  renderCheckBox({ optional: true })

  expect({ optional: true, required: false })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ optional: true })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ required: false })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('should not be disabled by default', () => {
  renderCheckBox()

  expect({ disabled: false })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ disabled: false })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ disabled: false })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('the CheckBox can be disabled via prop', () => {
  renderCheckBox({ disabled: true })

  expect({ disabled: true })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ disabled: true })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ disabled: true })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('is valid by default', () => {
  renderCheckBox()

  expect({ invalid: false })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ invalid: false })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ invalid: false })
    .toHaveBeenProvidedThrough(CheckBoxContext)
  expect({ visible: false })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ visible: true })
    .toHaveBeenProvidedThrough(HelperTextContext)
})

test('user can control validation state via error prop', () => {
  renderCheckBox({ error: true })

  expect({ invalid: true })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ invalid: true })
    .toHaveBeenProvidedThrough(LabelContext)
  expect({ invalid: true })
    .toHaveBeenProvidedThrough(CheckBoxContext)
  expect({ visible: true })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
  expect({ visible: false })
    .toHaveBeenProvidedThrough(HelperTextContext)
})

test('exposes the given error message', () => {
  const errorMessage = 'Whoops! something went wrong.'
  renderCheckBox({ errorMessage })

  expect({ errorMessage })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ message: errorMessage })
    .toHaveBeenProvidedThrough(ErrorMessageContext)
})

test('should not be checked by default', () => {
  renderCheckBox()

  expect({ checked: false })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ checked: false })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('checkBox can be Checked by prop', () => {
  renderCheckBox({ checked: true })

  expect({ checked: true })
    .toHaveBeenProvidedThrough(DefaultSlot)

  expect({ checked: true })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('should not be indeterminate by default', () => {
  renderCheckBox()

  expect({ indeterminate: false })
    .toHaveBeenProvidedThrough(DefaultSlot)
  expect({ indeterminate: false })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('checkBox can be indterminate by prop', () => {
  renderCheckBox({ indeterminate: true })

  expect({ indeterminate: true })
    .toHaveBeenProvidedThrough(DefaultSlot)

  expect({ indeterminate: true })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('checkBox can be valueable by prop', () => {
  renderCheckBox({ value: 'userName' })

  expect({ value: 'userName' })
    .toHaveBeenProvidedThrough(DefaultSlot)

  expect({ value: 'userName' })
    .toHaveBeenProvidedThrough(CheckBoxContext)
})

test('should handle v-model - provide value and updateValue through CheckBoxContext', async () => {
  const InjectorComponent = defineComponent({
    template: `
      <input value="userName"
             type="checkBox"
             data-testId="InjectorCheckBox"
             @input="updateValue($event.target.value)"
      />
    `,
    setup () {
      const { updateValue } = useCheckBoxContext()
      return { updateValue }
    },
  })

  const { getByTestId, emitted } = renderCheckBox(
    { modelValue: '' },
    '<InjectorComponent/>',
    { InjectorComponent },
  )

  const InjectorInput = getByTestId('InjectorCheckBox')

  expect(InjectorInput).not.toBeChecked()
  expect(emitted()).toEqual({})

  await fireEvent.click(InjectorInput)

  expect(InjectorInput).toBeChecked()
  expect(emitted()).toEqual({ 'update:modelValue': [['userName']] })
})

test('should be emit "on|off" if v-model not be provided ', async () => {
  const InjectorComponent = defineComponent({
    template: `
      <input type="checkBox"
             data-testId="InjectorCheckBox"
             @input="updateValue($event.target.value)"
      />
    `,
    setup () {
      const { updateValue } = useCheckBoxContext()
      return { updateValue }
    },
  })

  const { getByTestId, emitted } = renderCheckBox(
    { modelValue: '' },
    '<InjectorComponent/>',
    { InjectorComponent },
  )

  const InjectorInput = getByTestId('InjectorCheckBox')

  expect(InjectorInput).not.toBeChecked()
  expect(emitted()).toEqual({})

  await fireEvent.click(InjectorInput)

  expect(InjectorInput).toBeChecked()
  expect(emitted()).toEqual({ 'update:modelValue': [['on']] })
})

test('should handle v-model - provide checked and updateChecked through CheckBoxContext', async () => {
  const InjectorComponent = defineComponent({
    template: `
      <input type="checkBox"
             :checked="checked"
             data-testId="InjectorCheckBox"
             @input="updateChecked($event.target.checked)"
      />
    `,
    setup () {
      const { checked, updateChecked } = useCheckBoxContext()
      return { checked, updateChecked }
    },
  })

  const { getByTestId, emitted } = renderCheckBox(
    { modelValue: '' },
    '<InjectorComponent/>',
    { InjectorComponent },
  )

  const InjectorInput = getByTestId('InjectorCheckBox')

  expect(InjectorInput).not.toBeChecked()
  expect(emitted()).toEqual({})

  await fireEvent.click(InjectorInput)

  expect(InjectorInput).toBeChecked()
  expect(emitted()).toEqual({ 'update:checked': [[true]] })

  await fireEvent.click(InjectorInput)

  expect(InjectorInput).not.toBeChecked()
  expect(emitted()).toEqual({ 'update:checked': [[true], [false]] })
})
