import { LabelContextContract, provideLabelContext, useLabelContext } from '../LabelContextContract'
import { render } from '../../test-utils'
import { defineComponent } from 'vue'

const Injector = defineComponent({
  template: `
    <label :for="htmlFor" :id="id" :class="{'disabled': disabled, 'invalid': invalid}">
    Username <span v-if="optional">- Optional</span>
    </label>
  `,
  setup () {
    const context = useLabelContext()
    return { ...context }
  },
})

function renderProvider (contextValues: Partial<LabelContextContract>) {
  return render({
    template: '<Injector/>',
    components: { Injector },

    setup () {
      const defaultValues = {
        id: null,
        htmlFor: null,
        optional: false,
        disabled: false,
        invalid: false,
      }
      provideLabelContext({
        ...defaultValues,
        ...contextValues,
      })
    },
  })
}

test('throws an if no provider exists to perform the contract', () => {
  console.warn = jest.fn()
  expect(() => render(Injector)).toThrowError()
})

test('the contract defines a htmlFor property', () => {
  const { queryByText } = renderProvider({
    htmlFor: 'username',
  })

  expect(queryByText('Username'))
    .toHaveAttribute('for', 'username')
})

test('htmlFor can be null', () => {
  const { queryByText } = renderProvider({
    htmlFor: null,
  })

  expect(queryByText('Username'))
    .not.toHaveAttribute('for', 'username')
})

test('the contract defines an id property', () => {
  const { queryByText } = renderProvider({
    id: 'username-label',
  })

  expect(queryByText('Username'))
    .toHaveAttribute('id', 'username-label')
})

test('id can be null', () => {
  const { queryByText } = renderProvider({
    id: null,
  })

  expect(queryByText('Username'))
    .not.toHaveAttribute('id')
})

test('the contract defines an optional property', () => {
  const { queryByText } = renderProvider({
    optional: true,
  })

  expect(queryByText('Username'))
    .toHaveTextContent('- Optional')
})

test('the contract defines a disabled property', () => {
  const { queryByText } = renderProvider({
    disabled: true,
  })

  expect(queryByText('Username'))
    .toHaveClass('disabled')
})

test('the contract defines a disabled property', () => {
  const { queryByText } = renderProvider({
    disabled: true,
  })

  expect(queryByText('Username'))
    .toHaveClass('disabled')
})

test('the contract defines an invalid property', () => {
  const { queryByText } = renderProvider({
    invalid: true,
  })

  expect(queryByText('Username'))
    .toHaveClass('invalid')
})
