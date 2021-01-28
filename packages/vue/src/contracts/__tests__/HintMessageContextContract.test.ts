import { createProvider, render } from '../../test-utils'
import { HintMessageContextContract } from '../HintMessageContextContract'

const {
  renderProvider,
  ContextConsumer: HintMessageContextConsumer,
  ContextConsumerComponent,
} = createProvider<HintMessageContextContract>('HintMessageContext')

test('throws an error if no provider exists to perform the contract', () => {
  console.warn = jest.fn()
  expect(() => render(ContextConsumerComponent)).toThrowError()
})

test('the contract defines an id property', () => {
  const id = 'hint-message-id'

  renderProvider({ id })

  expect(HintMessageContextConsumer).toHaveBeenReceived({
    id,
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
