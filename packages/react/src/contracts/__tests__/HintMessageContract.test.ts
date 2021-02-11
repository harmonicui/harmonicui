import { createProvider } from '../../test-utils'
import { HintMessageContext, HintMessageContract } from '../HintMessageContract'

const {
  renderProvider,
  consumer: HintMessageContextConsumer,
} = createProvider<HintMessageContract>(HintMessageContext, 'HintMessageContext')

beforeAll(() => { console.warn = jest.fn() })
afterAll(() => { jest.restoreAllMocks() })

test('the contract defines an id property', () => {
  const id = 'hint-message-id'

  renderProvider({ id })

  expect(HintMessageContextConsumer).toHaveBeenReceived({
    id,
  })
})

test('id is null by default', () => {
  renderProvider({})

  expect(HintMessageContextConsumer).toHaveBeenReceived({
    id: null,
  })
})

test('the contract defines a visible property', () => {
  renderProvider({
    visible: false,
  })

  expect(HintMessageContextConsumer).toHaveBeenReceived({
    visible: false,
  })
})

test('visible is true by default', () => {
  renderProvider({})

  expect(HintMessageContextConsumer).toHaveBeenReceived({
    visible: true,
  })
})
