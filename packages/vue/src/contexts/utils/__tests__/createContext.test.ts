import { createContext } from '../createContext'
import { createProvider, render, renderInlineComponent } from '../../../test-utils'

type TestContract = {
  firstName: string,
  lastName: string
}

const contractDefaultValue: TestContract = {
  firstName: 'John',
  lastName: 'Doe',
}

const context = createContext<TestContract>('TestContract', contractDefaultValue)

const {
  consumer,
  renderProvider,
  ConsumerComponent,
} = createProvider(context, 'TestContext')

test('provider can provide values partially, it will be merged with contract defaults', () => {
  renderProvider({
    firstName: 'Jane',
  })

  expect(consumer).toHaveBeenReceived({
    firstName: 'Jane',
    lastName: 'Doe',
  })
})

test('throws warning if no provider performed the contract', () => {
  console.warn = jest.fn()

  render(ConsumerComponent)

  expect(console.warn).toHaveBeenCalledWith(
    expect.stringContaining(
      '[ HarmonicUI: UnperformedContractWarning ]: No provider performed the TestContract.',
    ),
  )
})

test('the default contract values will be returned if no provider exists', () => {
  render(ConsumerComponent)

  expect(consumer).toHaveBeenReceived(contractDefaultValue)
})

test('consumer can provide default values partially, it will be merged with contract defaults', () => {
  const consumerDefaultValue: Partial<TestContract> = {
    firstName: 'Jane',
  }

  renderInlineComponent({
    setup () {
      consumer(context.consume(consumerDefaultValue))
      return () => { /*  renders nothing. */ }
    },
  })

  expect(consumer).toHaveBeenReceived(
    { ...contractDefaultValue, ...consumerDefaultValue },
  )
})
