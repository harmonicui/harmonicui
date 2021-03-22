import { InputContract } from '@harmonicui/contracts'
import { renderComponent, renderInlineComponent, suppressUnperformedContractWarning } from '../../test-utils'
import { provideInputContext } from '../../contexts'
import TextFieldInput from './TextFieldInput'
import { ref } from 'vue'
import { fireEvent } from '@testing-library/vue'

function renderTextFieldInputWithContextProvider (context: Partial<InputContract>) {
  return renderInlineComponent({
    template: '<TextFieldInput />',
    components: { TextFieldInput },
    setup () {
      provideInputContext(context)
    },
  })
}

function getInput () {
  return document.querySelector('input')
}

test('renders an input element',
  suppressUnperformedContractWarning(() => {
    renderComponent(TextFieldInput)
    expect(getInput()).not.toBeNull()
  }),
)

test('consumes id from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ id: 'username' })
  expect(getInput()).toHaveAttribute('id', 'username')
})

test('does not render id attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    renderComponent(TextFieldInput)
    expect(getInput()).not.toHaveAttribute('id')
  }),
)
test('consumes disabled from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ disabled: true })
  expect(getInput()).toBeDisabled()
})

test('does not render disabled attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    renderComponent(TextFieldInput)
    expect(getInput()).not.toBeDisabled()
  }),
)

test('consumes required attribute from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ required: true })
  expect(getInput()).toBeRequired()
})

test('should not be required if not dictated by context', () => {
  renderTextFieldInputWithContextProvider({ required: false })
  expect(getInput()).not.toBeRequired()
})

test('is required by default',
  suppressUnperformedContractWarning(() => {
    renderComponent(TextFieldInput)
    expect(getInput()).toBeRequired()
  }),
)

test('consumes aria-describedby from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ 'aria-describedby': 'username-description' })
  expect(getInput()).toHaveAttribute('aria-describedby', 'username-description')
})

test('does not render aria-describedby attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    renderComponent(TextFieldInput)
    expect(getInput()).not.toHaveAttribute('aria-describedby')
  }),
)

test('consumes aria-errormessage from TextFieldInputContext', () => {
  renderTextFieldInputWithContextProvider({ 'aria-errormessage': 'username-error' })
  expect(getInput()).toHaveAttribute('aria-errormessage', 'username-error')
})

test('does not render aria-errormessage attribute if not provided through context',
  suppressUnperformedContractWarning(() => {
    renderComponent(TextFieldInput)
    expect(getInput()).not.toHaveAttribute('aria-errormessage')
  }),
)

test('consumes and update value provided by the context', async () => {
  const { getByTestId } = renderInlineComponent({
    template: `
      <TextFieldInput data-testId="input"/>
      <span data-testId="logger">{{ value }}</span>
    `,
    components: { TextFieldInput },

    setup () {
      const value = ref('initial value')
      const setValue = (v: string) => { value.value = v }

      provideInputContext({
        value: value.value,
        setValue,
      })

      return { value }
    },
  })

  expect(getByTestId('logger')).toHaveTextContent('initial value')
  expect(getInput()).toHaveValue('initial value')

  await fireEvent.update(getByTestId('input'), 'updated!')

  expect(getByTestId('logger')).toHaveTextContent('updated!')
  expect(getInput()).toHaveValue('updated!')
})

test('consumes invalid state from context', () => {
  renderTextFieldInputWithContextProvider({
    'aria-invalid': true,
    value: 'hello',
  })
  expect(getInput()).toBeInvalid()
})

test('must be valid by default', () => {
  renderTextFieldInputWithContextProvider({ value: 'hello world!' })
  expect(getInput()).toBeValid()
})

test('forwards uncontrolled props to the input element',
  suppressUnperformedContractWarning(() => {
    renderInlineComponent({
      template: `
        <TextFieldInput dir="rtl" name="username" data-test-id="test"/>
      `,
      components: { TextFieldInput },
    })

    expect(getInput()).toHaveAttribute('dir', 'rtl')
    expect(getInput()).toHaveAttribute('name', 'username')
    expect(getInput()).toHaveAttribute('data-test-id', 'test')
  }),
)

test('user must not be able to modify controlled props', () => {
  renderInlineComponent({
    template: '<TextFieldInput id="user" disabled required/>',
    components: { TextFieldInput },

    setup () {
      provideInputContext({
        id: 'context',
        disabled: false,
        required: false,
        'aria-describedby': 'context',
        'aria-errormessage': 'context',
      })
    },
  })

  expect(getInput()).not.toBeDisabled()
  expect(getInput()).not.toBeRequired()
  expect(getInput()).toHaveAttribute('id', 'context')
  expect(getInput()).toHaveAttribute('aria-describedby', 'context')
  expect(getInput()).toHaveAttribute('aria-errormessage', 'context')
})
