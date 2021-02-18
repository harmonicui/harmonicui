import { createProvider } from '../../test-utils'
import { InputContext, InputContract } from '../InputContract'

const {
  renderProvider,
  consumer: InputContextConsumer,
} = createProvider<InputContract>(InputContext, 'InputContext')

beforeAll(() => { console.warn = jest.fn() })
afterAll(() => { jest.restoreAllMocks() })

test('the contract defines an id property', () => {
  renderProvider({
    id: 'email',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    id: 'email',
  })
})

test('id is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    id: null,
  })
})

test('the contract defines an aria-errormessage property', () => {
  renderProvider({
    ariaErrormessage: 'error-message-id',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaErrormessage: 'error-message-id',
  })
})

test('aria-errormessage is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaErrormessage: null,
  })
})

test('the contract defines an aria-describedBy property', () => {
  renderProvider({
    ariaDescribedby: 'hint-message-id',
  })

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaDescribedby: 'hint-message-id',
  })
})

test('aria-errormessage is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    ariaDescribedby: null,
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

test('value is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    value: undefined,
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

test('UpdateValue is null by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    updateValue: null,
  })
})

test('the contract defines a required property', () => {
  renderProvider({ required: false })

  expect(InputContextConsumer).toHaveBeenReceived({
    required: false,
  })
})

test('required is true by default', () => {
  renderProvider({})

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

test('disabled is false by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    disabled: false,
  })
})

test('the contract defines an invalid property', () => {
  renderProvider({ invalid: true })

  expect(InputContextConsumer).toHaveBeenReceived(
    { invalid: true })
})

test('invalid is false by default', () => {
  renderProvider({})

  expect(InputContextConsumer).toHaveBeenReceived({
    invalid: false,
  })
})
