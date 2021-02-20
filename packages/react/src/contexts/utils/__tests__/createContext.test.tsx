import React from 'react'
import { render } from '@testing-library/react'
import { createContext } from '../createContext'
import { createProvider } from '../../../test-utils'

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
} = createProvider<TestContract>(context, 'TestContext')

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
  const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()

  render(<ConsumerComponent/>)

  expect(consoleWarnMock).toHaveBeenCalledWith(
    expect.stringContaining(
      '[ HarmonicUI: UnperformedContractWarning ]: No provider performed the TestContract.',
    ),
  )

  consoleWarnMock.mockRestore()
})

test('the default contract values will be returned if no provider exists', () => {
  const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()

  render(<ConsumerComponent/>)

  expect(consumer).toHaveBeenReceived(contractDefaultValue)
  consoleWarnMock.mockRestore()
})

test('consumer can provide default values partially, it will be merged with contract defaults', () => {
  const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()

  const consumerDefaultValue: Partial<TestContract> = {
    firstName: 'Jane',
  }

  function ConsumerComponent () {
    consumer(context.consume(consumerDefaultValue))
    return (<> {/*  renders nothing. */} </>)
  }

  render(<ConsumerComponent/>)

  expect(consumer).toHaveBeenReceived(
    { ...contractDefaultValue, ...consumerDefaultValue },
  )

  consoleWarnMock.mockRestore()
})
