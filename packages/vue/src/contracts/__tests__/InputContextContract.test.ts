import { defineComponent } from 'vue'
import { render } from '../../test-utils'
import { InputContextContract, provideInputContext, useInputContext } from '../InputContextContract'

const Injector = defineComponent({
  template: `
    <input
        :id="id"
        :value="value"
        :required="required"
        :disabled="disabled"
        :aria-invalid="invalid"
        :aria-describedby="ariaDescribedby"
        :aria-errormessage="ariaErrormessage"
    />
  `,
  setup () {
    const { updateValue, ...context } = useInputContext()
    updateValue('hello world!')
    return { ...context }
  },
})

function renderProvider (contextValues: Partial<InputContextContract>) {
  return render({
    template: '<Injector/>',
    components: { Injector },

    setup () {
      const defaultValues = {
        value: '',
        id: 'email',
        ariaErrormessage: 'error',
        ariaDescribedby: 'hint',
        required: false,
        disabled: false,
        invalid: false,
        updateValue (value: unknown) { return value },
      }
      provideInputContext({
        ...defaultValues,
        ...contextValues,
      })
    },
  })
}

test('throws an error if no provider exists to perform the contract', () => {
  console.warn = jest.fn()
  expect(() => render(Injector)).toThrowError()
})

test('the contract defines an id property', () => {
  renderProvider({
    id: 'email',
  })

  expect(document.querySelector('input'))
    .toHaveAttribute('id', 'email')
})

test('the contract defines an ariaErrormessage property', () => {
  renderProvider({
    ariaErrormessage: 'error-message-id',
  })

  expect(document.querySelector('input'))
    .toHaveAttribute('aria-errormessage', 'error-message-id')
})

test('the contract defines an ariaDescribedBy property', () => {
  renderProvider({
    ariaDescribedby: 'hint-message-id',
  })

  expect(document.querySelector('input'))
    .toHaveAttribute('aria-describedby', 'hint-message-id')
})

test('the contract defines a value property', () => {
  renderProvider({
    value: 'hello!',
  })

  expect(document.querySelector('input'))
    .toHaveValue('hello!')
})

test('the contract defines an updateValue method', () => {
  let updatedValue

  renderProvider({
    updateValue: (value) => {
      updatedValue = value
    },
  })

  expect(updatedValue)
    .toEqual('hello world!')
})

test('the contract defines a required property', () => {
  renderProvider({ required: true })

  expect(document.querySelector('input'))
    .toBeRequired()
})

test('the contract defines a disabled property', () => {
  renderProvider({ disabled: true })

  expect(document.querySelector('input'))
    .toBeDisabled()
})

test('the contract defines an invalid property', () => {
  renderProvider({ invalid: true })

  expect(document.querySelector('input'))
    .toBeInvalid()
})
