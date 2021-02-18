import { createProvider } from '../../test-utils'
import { ErrorMessageContext, ErrorMessageContract } from '../ErrorMessageContract'

const {
  renderProvider,
  consumer: ErrorMessageContextConsumer,
} = createProvider<ErrorMessageContract>(ErrorMessageContext, 'ErrorMessageContext')

beforeAll(() => { console.warn = jest.fn() })
afterAll(() => { jest.restoreAllMocks() })

test('the contract defines an id property', () => {
  renderProvider({
    id: 'email-error-message',
  })

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    id: 'email-error-message',
  })
})

test('id is null by default', () => {
  renderProvider({})

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    id: null,
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

test('visible is false by default', () => {
  renderProvider({})

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

test('message is null by default', () => {
  renderProvider({})

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    message: null,
  })
})
