import { DefineComponent, nextTick, ref } from 'vue'
import { renderInlineComponent } from '../../test-utils'
import { AssertionsConfigurationOptions, CheckBoxAssertions } from './Assertions'
import { CheckBox, CheckBoxLabel, CheckBoxHelperText, CheckBoxInput, CheckBoxErrorMessage } from './index'
import { fireEvent } from '@testing-library/vue'

function getCheckBox () {
  return container.querySelector('div')
}

function renderTemplate (template: string, setup?: DefineComponent['setup']) {
  return renderInlineComponent({
    template,
    components: {
      CheckBox,
      CheckBoxErrorMessage,
      CheckBoxHelperText,
      CheckBoxInput,
      CheckBoxLabel,
    },
    setup,
  })
}

async function renderAndRunAssertions (template: string, assertionOptions: AssertionsConfigurationOptions = {}) {
  renderTemplate(template)

  await nextTick()

  const assertions = new CheckBoxAssertions(assertionOptions)
  assertions.runAllAssertions()
}

test('should be named properly', () => {
  expect(CheckBox).toHaveBeenNamed('CheckBox')
})

test('exposes a isChecked function through default slot', async () => {
  const { getByTestId } = renderTemplate(`
    <CheckBox v-slot="{isChecked}">
      <CheckBoxLabel>Username</CheckBoxLabel>
      <CheckBoxInput data-testid="input"  />
      <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
      <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      <span v-show="isChecked()" data-testid="status" >is checked</span>
    </CheckBox> 
  `)

  const input = getByTestId('input')

  expect(getByTestId('status')).not.toBeVisible()
  expect(input).not.toBeChecked()

  await fireEvent.click(input)

  expect(getByTestId('status')).toBeVisible()
  expect(input).toBeChecked()
})

describe('rendering', () => {
  test('should render as a render-less component by default', () => {
    expect(CheckBox).toBeRenderLessComponent()
    expect(CheckBox).toRendersDefaultSlotContent()
  })

  test('can be render as a div', () => {
    renderTemplate(`
      <CheckBox as="div">
        Inner content!
      </CheckBox>
    `)

    expect(getCheckBox()).not.toBeNull()
    expect(getCheckBox()).toHaveTextContent('Inner content!')
  })

  test('forwards additional props to inner element if rendered div', () => {
    renderTemplate(`
      <CheckBox as="div" class="className" id="CheckBox">
        Inner content!
      </CheckBox>
    `)

    expect(getCheckBox()).toHaveClass('className')
    expect(getCheckBox()).toHaveAttribute('id', 'CheckBox')
  })

  test('attrs should be handled manually to prevent "Extraneous non-props attributes" warning when rendering as fragment', () => {
    const spy = jest.spyOn(console, 'warn')

    renderTemplate(`
      <CheckBox class="className" id="CheckBox">
        Inner content!
      </CheckBox>
    `)

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  test('rendering with CheckBoxInput, CheckBoxLabel, CheckBoxHelperText and CheckBoxErrorMessage components', async () => {
    await renderAndRunAssertions(`
      <CheckBox>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `)
  })

  test('rendering with custom elements/components using default slot props', async () => {
    await renderAndRunAssertions(`
      <CheckBox v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `)
  })
})

describe('states', () => {
  test('CheckBoxInput can be optional', async () => {
    await renderAndRunAssertions(`
      <CheckBox optional>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      states: ['optional'],
    })
  })

  test('CheckBoxInput can be disabled', async () => {
    await renderAndRunAssertions(`
      <CheckBox disabled>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      states: ['disabled'],
    })
  })

  test('CheckBoxInput can be Checked', async () => {
    await renderAndRunAssertions(`
      <CheckBox checked>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      states: ['checked'],
    })
  })

  test('CheckBoxInput can be indeterminate', async () => {
    await renderAndRunAssertions(`
      <CheckBox indeterminate>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      states: ['indeterminate'],
    })
  })

  test('CheckBox\'s value may invalid', async () => {
    await renderAndRunAssertions(`
      <CheckBox invalid>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      states: ['invalid'],
    })
  })

  test('multiple states can be applied to CheckBoxInput at the same time', async () => {
    await renderAndRunAssertions(`
      <CheckBox invalid disabled optional checked>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      states: ['invalid', 'optional', 'disabled', 'checked'],
    })
  })

  test('custom Input can be optional', async () => {
    await renderAndRunAssertions(`
      <CheckBox optional v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      states: ['optional'],
    })
  })

  test('custom Input can be disabled', async () => {
    await renderAndRunAssertions(`
      <CheckBox disabled v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      states: ['disabled'],
    })
  })

  test('custom Input\'s value may invalid', async () => {
    await renderAndRunAssertions(`
      <CheckBox invalid v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      states: ['invalid'],
    })
  })

  test('custom Input can be checked', async () => {
    await renderAndRunAssertions(`
      <CheckBox checked v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      states: ['checked'],
    })
  })

  test('custom Input can be indeterminate', async () => {
    await renderAndRunAssertions(`
      <CheckBox indeterminate v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      states: ['indeterminate'],
    })
  })

  test('multiple states can be applied to the custom Input at the same time', async () => {
    await renderAndRunAssertions(`
      <CheckBox invalid disabled optional checked v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      states: ['invalid', 'optional', 'disabled', 'checked'],
    })
  })

  test('should expose state props through default slot', async () => {
    renderTemplate(`
      <CheckBox invalid disabled checked v-slot="{ invalid, disabled, optional, required , checked}">
        <label :class="{required: optional === false, invalid: invalid}">Username</label>
        <input type="checkbox" :disabled="disabled" :required="required" :checked="checked"/>
      </CheckBox>
    `)

    expect(container.querySelector('input')).toBeRequired()
    expect(container.querySelector('input')).toBeChecked()
    expect(container.querySelector('input')).toBeDisabled()
    expect(container.querySelector('label')).toHaveClass('invalid', 'required')
  })
})

describe('v-model', () => {
  test('shares and controls the modelValue through CheckBoxInput context', async () => {
    const modelValue = ref([''])
    const value = 'Harmonic UI'

    const { getByLabelText } = renderTemplate(`
      <CheckBox v-model="modelValue" :value="value">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
      </CheckBox>
    `, () => ({ value, modelValue, checked: true }))

    await nextTick()

    const input = getByLabelText('Username')

    expect(input).toHaveAttribute('value', 'Harmonic UI')
    expect(input).not.toBeChecked()

    await fireEvent.click(input)

    expect(input).toBeChecked()
    expect(modelValue.value).toContain('Harmonic UI')

    await fireEvent.click(input)

    expect(input).not.toBeChecked()
    expect(modelValue.value).not.toContain('Harmonic UI')
  })

  test('shares and controls the value through default slot props', async () => {
    const modelValue = ref([''])
    const value = 'Harmonic UI'

    const { getByLabelText } = renderTemplate(`
      <CheckBox v-model="modelValue" :value="value" v-slot="{ inputProps, labelProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
      </CheckBox>
    `, () => ({ value, modelValue }))

    await nextTick()

    const input = getByLabelText('Username')

    expect(input).toHaveAttribute('value', 'Harmonic UI')
    expect(input).not.toBeChecked()

    await fireEvent.click(input)

    expect(input).toBeChecked()
    expect(modelValue.value).toContain('Harmonic UI')

    await fireEvent.click(input)

    expect(input).not.toBeChecked()
    expect(modelValue.value).not.toContain('Harmonic UI')
  })

  test('provide on or off if value not provided', async () => {
    const modelValue = ref([])

    const { getByLabelText } = renderTemplate(`
      <CheckBox v-model="modelValue" v-slot="{ inputProps, labelProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
      </CheckBox>
    `, () => ({ modelValue }))

    await nextTick()

    const input = getByLabelText('Username')

    expect(input).toHaveAttribute('value', '')
    expect(input).not.toBeChecked()

    await fireEvent.click(input)

    expect(input).toBeChecked()
    expect(modelValue.value).toEqual(['on'])

    await fireEvent.click(input)

    expect(input).not.toBeChecked()
    expect(modelValue.value).toEqual(['off'])
  })
})

describe('aria-* attributes', () => {
  test('CheckBoxLabel loses for attribute if Input does not exists', async () => {
    await renderAndRunAssertions(`
      <CheckBox>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      ignoreAssertions: ['Input'],
    })
  })

  test('custom Label loses for attribute if Input does not exists', async () => {
    await renderAndRunAssertions(`
      <CheckBox v-slot="{ labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      ignoreAssertions: ['Input'],
    })
  })

  test('CheckBoxInput loses the aria-describedby attribute if HelperText does not exists', async () => {
    await renderAndRunAssertions(`
      <CheckBox>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
      </CheckBox>
    `, {
      ignoreAssertions: ['HelperText'],
    })
  })

  test('custom Input loses the aria-describedby attribute if HelperText does not exists', async () => {
    await renderAndRunAssertions(`
      <CheckBox v-slot="{ inputProps, labelProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
      </CheckBox>
    `, {
      ignoreAssertions: ['HelperText'],
    })
  })

  test('CheckBoxInput loses the aria-errormessage attribute if ErrorMessage does not exists', async () => {
    await renderAndRunAssertions(`
      <CheckBox invalid>
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
      `, {
      states: ['invalid'],
      ignoreAssertions: ['ErrorMessage'],
    })
  })

  test('custom Input loses the aria-errormessage attribute if ErrorMessage does not exists', async () => {
    await renderAndRunAssertions(`
      <CheckBox invalid v-slot="{ inputProps, labelProps, helperTextProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      states: ['invalid'],
      ignoreAssertions: ['ErrorMessage'],
    })
  })
})

describe('overriding IDs', () => {
  test('CheckBoxInput id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox input-id="input-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      id: { input: 'input-id' },
    })
  })

  test('custom Input id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox input-id="input-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input type="checkbox" v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      id: { input: 'input-id' },
    })
  })

  test('CheckBoxLabel id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox label-id="label-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      id: { label: 'label-id' },
    })
  })

  test('custom Label id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox label-id="label-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      id: { label: 'label-id' },
    })
  })

  test('CheckBoxHelperText id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox helper-text-id="helper-text-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      id: { helperText: 'helper-text-id' },
    })
  })

  test('custom HelperText id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox helper-text-id="helper-text-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      id: { helperText: 'helper-text-id' },
    })
  })

  test('CheckBoxErrorMessage id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox error-message-id="error-message-id">
        <CheckBoxLabel>Username</CheckBoxLabel>
        <CheckBoxInput />
        <CheckBoxErrorMessage>Oops! something went wrong.</CheckBoxErrorMessage>
        <CheckBoxHelperText>Something that might help!</CheckBoxHelperText>
      </CheckBox>
    `, {
      id: { errorMessage: 'error-message-id' },
    })
  })

  test('custom ErrorMessage id should be overridable', async () => {
    await renderAndRunAssertions(`
      <CheckBox error-message-id="error-message-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </CheckBox>
    `, {
      id: { errorMessage: 'error-message-id' },
    })
  })
})
