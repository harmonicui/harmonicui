import { defineComponent } from 'vue'
import { render } from '../../test-utils'
import {
  HintMessageContextContract,
  provideHintMessageContext,
  useHintMessageContext,
} from '../HintMessageContextContract'

const Injector = defineComponent({
  template: `
    <span :id="id" v-if="visible"/>
  `,
  setup () {
    const context = useHintMessageContext()
    return { ...context }
  },
})

function renderProvider (contextValues: Partial<HintMessageContextContract>) {
  return render({
    template: '<Injector/>',
    components: { Injector },

    setup () {
      const defaultValues = {
        id: '',
        visible: true,
      }
      provideHintMessageContext({
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
  const id = 'hint-message-id'

  renderProvider({ id })

  expect(document.querySelector('span'))
    .toHaveAttribute('id', id)
})

test('the contract defines a visible property', () => {
  renderProvider({ visible: false })

  expect(document.querySelector('span'))
    .not.toBeInTheDocument()
})
