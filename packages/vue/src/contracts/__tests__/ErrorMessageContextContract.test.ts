import { createProvider, render } from '../../test-utils'
import { ErrorMessageContextContract } from '../ErrorMessageContextContract'

const {
  renderProvider,
  ContextConsumer: ErrorMessageContextConsumer,
  ContextConsumerComponent,
} = createProvider<ErrorMessageContextContract>('ErrorMessageContext')

test('throws an error if no provider exists to perform the contract', () => {
  console.warn = jest.fn()
  expect(() => render(ContextConsumerComponent)).toThrowError()
})

test('the contract defines an id property', () => {
  renderProvider({
    id: 'email-error-message',
  })

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    id: 'email-error-message',
  })
})

test('the contract defines a visible property', () => {
  renderProvider({
    visible: false,
  })

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    visible: false,
  })
})

test('the contract defines an message property', () => {
  const message = 'Whoops! something went wrong.'

  renderProvider({
    message,
  })

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    message,
  })
})
