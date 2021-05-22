import { DefineComponent, nextTick, ref } from 'vue'
import { renderInlineComponent } from '../../test-utils'
import { AssertionsConfigurationOptions, TextFieldAssertions } from './Assertions'
import { TextField, TextFieldErrorMessage, TextFieldHelperText, TextFieldInput, TextFieldLabel } from './index'
import { fireEvent } from '@testing-library/vue'

function getTextField () {
  return container.querySelector('div')
}

function renderTemplate (template: string, setup?: DefineComponent['setup']) {
  return renderInlineComponent({
    template,
    components: {
      TextField,
      TextFieldInput,
      TextFieldLabel,
      TextFieldHelperText,
      TextFieldErrorMessage,
    },
    setup,
  })
}

async function renderAndRunAssertions (template: string, assertionOptions: AssertionsConfigurationOptions = {}) {
  renderTemplate(template)

  await nextTick()

  const assertions = new TextFieldAssertions(assertionOptions)
  assertions.runAllAssertions()
}

test('should be named properly', () => {
  expect(TextField).toHaveBeenNamed('TextField')
})

describe('rendering', () => {
  test('should render as a render-less component by default', () => {
    expect(TextField).toBeRenderLessComponent()
    expect(TextField).toRendersDefaultSlotContent()
  })

  test('can be render as a div', () => {
    renderTemplate(`
      <TextField as="div">
        Inner content!
      </TextField>
    `)

    expect(getTextField()).not.toBeNull()
    expect(getTextField()).toHaveTextContent('Inner content!')
  })

  test('forwards additional props to inner element if rendered div', () => {
    renderTemplate(`
      <TextField as="div" class="className" id="TextField">
        Inner content!
      </TextField>
    `)

    expect(getTextField()).toHaveClass('className')
    expect(getTextField()).toHaveAttribute('id', 'TextField')
  })

  test('attrs should be handled manually to prevent "Extraneous non-props attributes" warning when rendering as fragment', () => {
    const spy = jest.spyOn(console, 'warn')

    renderTemplate(`
      <TextField class="className" id="TextField">
        Inner content!
      </TextField>
    `)

    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  test('rendering with TextFieldInput, TextFieldLabel, TextFieldHelperText and TextFieldErrorMessage components', async () => {
    await renderAndRunAssertions(`
      <TextField>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `)
  })

  test('rendering with custom elements/components using default slot props', async () => {
    await renderAndRunAssertions(`
      <TextField v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `)
  })
})

describe('states', () => {
  test('TextFieldInput can be optional', async () => {
    await renderAndRunAssertions(`
      <TextField optional>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      states: ['optional'],
    })
  })

  test('TextFieldInput can be disabled', async () => {
    await renderAndRunAssertions(`
      <TextField disabled>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      states: ['disabled'],
    })
  })

  test('TextFieldInput\'s value may invalid', async () => {
    await renderAndRunAssertions(`
      <TextField invalid>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      states: ['invalid'],
    })
  })

  test('multiple states can be applied to TextFieldInput at the same time', async () => {
    await renderAndRunAssertions(`
      <TextField invalid disabled optional>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      states: ['invalid', 'optional', 'disabled'],
    })
  })

  test('custom Input can be optional', async () => {
    await renderAndRunAssertions(`
      <TextField optional v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      states: ['optional'],
    })
  })

  test('custom Input can be disabled', async () => {
    await renderAndRunAssertions(`
      <TextField disabled v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      states: ['disabled'],
    })
  })

  test('custom Input\'s value may invalid', async () => {
    await renderAndRunAssertions(`
      <TextField invalid v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      states: ['invalid'],
    })
  })

  test('multiple states can be applied to the custom Input at the same time', async () => {
    await renderAndRunAssertions(`
      <TextField invalid disabled optional v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      states: ['invalid', 'optional', 'disabled'],
    })
  })

  test('should expose state props through default slot', async () => {
    renderTemplate(`
      <TextField invalid disabled v-slot="{ invalid, disabled, optional, required }">
        <label :class="{required: optional === false, invalid: invalid}">Username</label>
        <input :disabled="disabled" :required="required"/>
      </TextField>
    `)

    expect(container.querySelector('input')).toBeRequired()
    expect(container.querySelector('input')).toBeDisabled()
    expect(container.querySelector('label')).toHaveClass('invalid', 'required')
  })
})

describe('v-model', () => {
  test('shares and controls the value through TextFieldInput context', async () => {
    const value = ref('Harmonic UI')

    const { getByLabelText } = renderTemplate(`
      <TextField v-model="value">
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
      </TextField>
    `, () => ({ value }))

    await nextTick()

    const input = getByLabelText('Username')
    expect(input).toHaveValue('Harmonic UI')

    await fireEvent.update(input, 'updated!')

    expect(input).toHaveValue('updated!')
    expect(value.value).toEqual('updated!')
  })

  test('shares and controls the value through default slot props', async () => {
    const value = ref('Harmonic UI')

    const { getByLabelText } = renderTemplate(`
      <TextField v-model="value" v-slot="{ inputProps, labelProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
      </TextField>
    `, () => ({ value }))

    await nextTick()

    const input = getByLabelText('Username')
    expect(input).toHaveValue('Harmonic UI')

    await fireEvent.update(input, 'updated!')

    expect(input).toHaveValue('updated!')
    expect(value.value).toEqual('updated!')
  })

  test('exposes a clear function through default slot', async () => {
    const value = ref('Harmonic UI')

    const {
      getByLabelText,
      getByText,
    } = renderTemplate(`
      <TextField v-model="value" v-slot="{ inputProps, labelProps, clear }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <button @click="clear">clear</button>
      </TextField>
    `, () => ({ value }))

    await nextTick()

    const input = getByLabelText('Username')
    const clearBtn = getByText('clear')
    expect(input).toHaveValue('Harmonic UI')

    await fireEvent.click(clearBtn)

    expect(input).toHaveValue('')
    expect(value.value).toEqual('')
  })
})

describe('aria-* attributes', () => {
  test('TextFieldLabel loses for attribute if Input does not exists', async () => {
    await renderAndRunAssertions(`
      <TextField>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      ignoreAssertions: ['Input'],
    })
  })

  test('custom Label loses for attribute if Input does not exists', async () => {
    await renderAndRunAssertions(`
      <TextField v-slot="{ labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      ignoreAssertions: ['Input'],
    })
  })

  test('TextFieldInput loses the aria-describedby attribute if HelperText does not exists', async () => {
    await renderAndRunAssertions(`
      <TextField>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
      </TextField>
    `, {
      ignoreAssertions: ['HelperText'],
    })
  })

  test('custom Input loses the aria-describedby attribute if HelperText does not exists', async () => {
    await renderAndRunAssertions(`
      <TextField v-slot="{ inputProps, labelProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
      </TextField>
    `, {
      ignoreAssertions: ['HelperText'],
    })
  })

  test('TextFieldInput loses the aria-errormessage attribute if ErrorMessage does not exists', async () => {
    await renderAndRunAssertions(`
      <TextField invalid>
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
      `, {
      states: ['invalid'],
      ignoreAssertions: ['ErrorMessage'],
    })
  })

  test('custom Input loses the aria-errormessage attribute if ErrorMessage does not exists', async () => {
    await renderAndRunAssertions(`
      <TextField invalid v-slot="{ inputProps, labelProps, helperTextProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      states: ['invalid'],
      ignoreAssertions: ['ErrorMessage'],
    })
  })
})

describe('overriding IDs', () => {
  test('TextFieldInput id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField input-id="input-id">
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      id: { input: 'input-id' },
    })
  })

  test('custom Input id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField input-id="input-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      id: { input: 'input-id' },
    })
  })

  test('TextFieldLabel id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField label-id="label-id">
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      id: { label: 'label-id' },
    })
  })

  test('custom Label id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField label-id="label-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      id: { label: 'label-id' },
    })
  })

  test('TextFieldHelperText id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField helper-text-id="helper-text-id">
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      id: { helperText: 'helper-text-id' },
    })
  })

  test('custom HelperText id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField helper-text-id="helper-text-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      id: { helperText: 'helper-text-id' },
    })
  })

  test('TextFieldErrorMessage id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField error-message-id="error-message-id">
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput />
        <TextFieldErrorMessage>Oops! something went wrong.</TextFieldErrorMessage>
        <TextFieldHelperText>Something that might help!</TextFieldHelperText>
      </TextField>
    `, {
      id: { errorMessage: 'error-message-id' },
    })
  })

  test('custom ErrorMessage id should be overridable', async () => {
    await renderAndRunAssertions(`
      <TextField error-message-id="error-message-id" v-slot="{ inputProps, labelProps, helperTextProps, errorMessageProps }">
        <label v-bind="labelProps">Username</label>
        <input v-bind="inputProps"/>
        <div v-bind="errorMessageProps">Oops! something went wrong.</div>
        <div v-bind="helperTextProps">Something that might help!</div>
      </TextField>
    `, {
      id: { errorMessage: 'error-message-id' },
    })
  })
})
