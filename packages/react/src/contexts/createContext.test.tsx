import React from 'react'
import { render } from '@testing-library/react'
import { createContext } from './createContext'

interface TestContract {
  firstName: string
  lastName: string
}

const context = createContext<TestContract>('TestContext')

const consumer = jest.fn()

function Consumer() {
  consumer(context.consume())
  return <>{/*  renders nothing. */}</>
}

test('throws an Error if no provider exits', () => {
  console.error = jest.fn()

  expect(() => {
    render(<Consumer />)
  }).toThrowError('Error: No provider found for TestContext')

  jest.restoreAllMocks()
})

test('created context should work properly', () => {
  const contextInput: TestContract = {
    firstName: 'John',
    lastName: 'Doe',
  }

  function Provider() {
    return (
      <context.Provider value={contextInput}>
        <Consumer />
      </context.Provider>
    )
  }

  render(<Provider />)

  expect(consumer).toHaveBeenCalledWith(contextInput)
})

test('Provider component should be named properly', () => {
  expect(context.Provider).toHaveBeenNamed('TestContextProvider')
})

// const {
//   consumer,
//   renderProvider,
//   ConsumerComponent,
// } = createProvider<TestContract>(context, 'TestContext')
//
// test('provider can provide values partially, it will be merged with contract defaults', () => {
//   renderProvider({
//     firstName: 'Jane',
//   })
//
//   expect(consumer).toHaveBeenReceived({
//     firstName: 'Jane',
//     lastName: 'Doe',
//   })
// })
//
// test('throws warning if no provider performed the contract', () => {
//   const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()
//
//   render(<ConsumerComponent/>)
//
//   expect(consoleWarnMock).toHaveBeenCalledWith(
//     expect.stringContaining(
//       '[ HarmonicUI: UnperformedContractWarning ]: No provider performed the TestContract.',
//     ),
//   )
//
//   consoleWarnMock.mockRestore()
// })
//
// test('the default contract values will be returned if no provider exists', () => {
//   const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()
//
//   render(<ConsumerComponent/>)
//
//   expect(consumer).toHaveBeenReceived(new TestContract())
//   consoleWarnMock.mockRestore()
// })
//
// test('consumer can provide default values partially, it will be merged with contract defaults', () => {
//   const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation()
//
//   const consumerDefaultValue: Partial<TestContract> = {
//     firstName: 'Jane',
//   }
//
//   function ConsumerComponent () {
//     consumer(context.consume(consumerDefaultValue))
//     return (<> {/*  renders nothing. */} </>)
//   }
//
//   render(<ConsumerComponent/>)
//
//   expect(consumer).toHaveBeenReceived(
//     { ...new TestContract(), ...consumerDefaultValue },
//   )
//
//   consoleWarnMock.mockRestore()
// })
