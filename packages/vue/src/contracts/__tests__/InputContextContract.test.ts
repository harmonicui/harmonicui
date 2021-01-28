import { createProvider, render } from '../../test-utils'
import { InputContextContract } from '../InputContextContract'

const {
  renderProvider,
  ContextConsumer: InputContextConsumer,
  ContextConsumerComponent,
} = createProvider<InputContextContract>('InputContext')

test('throws an error if no provider exists to perform the contract', () => {
  console.warn = jest.fn()
  expect(() => render(ContextConsumerComponent))
    .toThrowError()
})

test('the contract defines an id property', () => {
  renderProvider({
    id: 'email',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    id: 'email',
  })
})

test('the contract defines an ariaErrormessage property', () => {
  renderProvider({
    ariaErrormessage: 'error-message-id',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaErrormessage: 'error-message-id',
  })
})

test('the contract defines an ariaDescribedBy property', () => {
  renderProvider({
    ariaDescribedby: 'hint-message-id',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaDescribedby: 'hint-message-id',
  })
})

test('the contract defines a value property', () => {
  renderProvider({
    value: 'hello!',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    value: 'hello!',
  })
})

test('the contract defines an updateValue method', () => {
  const mock = jest.fn()

  renderProvider({
    updateValue: mock,
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    updateValue: mock,
  })
})

test('the contract defines a required property', () => {
  renderProvider({ required: true })

  expect(InputContextConsumer).toHaveBeenReceived({
    required: true,
  })
})

test('the contract defines a disabled property', () => {
  renderProvider({ disabled: true })

  expect(InputContextConsumer).toHaveBeenReceived({
    disabled: true,
  })
})

test('the contract defines an invalid property', () => {
  renderProvider({ invalid: true })

  expect(InputContextConsumer).toHaveBeenReceived(
    { invalid: true })
})
