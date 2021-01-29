import { Component, defineComponent } from 'vue'
import { renderInlineComponent } from './index'
import { RenderResult } from '@testing-library/vue'

type CreateProviderResult<Contract> = {
  renderProvider (contextValues: Partial<Contract>): RenderResult
  consumer: jest.Mock
  ConsumerComponent: Component
}

type Context<Contract> = {
  provide (context: Partial<Contract>): void
  consume (defaultValues?: Contract): Contract
}

function createConsumer (name: string) {
  const consumer = jest.fn()

  beforeEach(() => {
    consumer.mockClear()
    consumer.mockName(name)
  })

  return consumer
}

function createProvider<Contract> (context: Context<Contract>, name: string): CreateProviderResult<Contract> {
  const consumer = createConsumer(name)

  const ConsumerComponent = defineComponent({
    setup () {
      consumer(context.consume())
      return () => { /*  renders nothing. */ }
    },
  })

  function renderProvider (contextValues: Partial<Contract>) {
    return renderInlineComponent({
      template: '<ConsumerComponent/>',
      components: { ConsumerComponent },
      setup () {
        context.provide(contextValues)
      },
    })
  }

  return {
    renderProvider,
    consumer,
    ConsumerComponent,
  }
}

export { createProvider }
