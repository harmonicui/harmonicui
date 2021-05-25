import { defineComponent } from 'vue'
import { createContext } from './createContext'
import { renderInlineComponent } from '../test-utils'

interface TestContract {
  firstName: string
  lastName: string
}

const context = createContext<TestContract>('TestContext')

test('throws error if no provider exists', () => {
  console.warn = jest.fn()

  expect(() => {
    renderInlineComponent({
      setup() {
        context.consume()
        return () => {
          /*  renders nothing. */
        }
      },
    })
  }).toThrowError('Error: No provider found for TestContext,')

  jest.restoreAllMocks()
})

test('created context should work properly', () => {
  const consumer = jest.fn()

  const contextInput: TestContract = {
    firstName: 'James',
    lastName: 'May',
  }

  const ConsumerComponent = defineComponent({
    setup() {
      consumer(context.consume())
      return () => {
        /*  renders nothing. */
      }
    },
  })

  renderInlineComponent({
    template: '<ConsumerComponent />',
    components: { ConsumerComponent },
    setup() {
      context.provide(contextInput)
    },
  })

  expect(consumer).toHaveBeenCalledWith(contextInput)
})

test('exposes the generated context key', () => {
  expect(typeof context.key).toEqual('symbol')
})
