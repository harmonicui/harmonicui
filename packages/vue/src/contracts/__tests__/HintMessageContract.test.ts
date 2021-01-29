import { createProvider, render } from '../../test-utils'
import { HintMessageContext, HintMessageContract } from '../HintMessageContract'

const {
  renderProvider,
  consumer: HintMessageContextConsumer,
  ConsumerComponent,
} = createProvider<HintMessageContract>(HintMessageContext, 'HintMessageContext')

test('throws a warning and returns default values if no provider exists to perform the contract', () => {
  console.warn = jest.fn()

  const defaults = {
    id: null,
    visible: true,
  }

  render(ConsumerComponent)

  expect(console.warn).toHaveBeenCalledWith(
    expect.stringContaining('[ HarmonicUI: UnperformedContractWarning ]'),
  )
  expect(HintMessageContextConsumer).toHaveBeenReceived(defaults)
})

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
