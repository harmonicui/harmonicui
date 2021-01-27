import { defineComponent } from 'vue'
import { render } from '../../test-utils'
import {
  ErrorMessageContextContract,
  provideErrorMessageContext,
  useErrorMessageContext,
} from '../ErrorMessageContextContract'

const Injector = defineComponent({
  template: `
    <span :id="id" v-if="visible">{{ message }}</span>
  `,
  setup () {
    const context = useErrorMessageContext()
    return { ...context }
  },
})

function renderProvider (contextValues: Partial<ErrorMessageContextContract>) {
  return render({
    template: '<Injector/>',
    components: { Injector },

    setup () {
      const defaultValues = {
        id: '',
        visible: true,
        message: '',
      }
      provideErrorMessageContext({
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
    id: 'email-error-message',
  })

  expect(document.querySelector('span'))
    .toHaveAttribute('id', 'email-error-message')
})

test('the contract defines a visible property', () => {
  renderProvider({
    visible: false,
  })

  expect(document.querySelector('span'))
    .not.toBeInTheDocument()
})

test('the contract defines an message property', () => {
  const message = 'Whoops! something went wrong.'

  renderProvider({
    message,
  })

  expect(document.querySelector('span'))
    .toHaveTextContent(message)
})
