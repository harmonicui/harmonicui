/* eslint-disable @typescript-eslint/no-var-requires */

import { Component, defineComponent } from 'vue'
import { renderInlineComponent } from './index'
import { RenderResult } from '@testing-library/vue'

type CreateProviderResult<Contract> = {
  renderProvider (contextValues: Contract): RenderResult
  ContextConsumer: jest.Mock
  ContextConsumerComponent: Component
}

function resolveContext (contextName: string) {
  const context = require(`../contracts/${contextName}Contract`)
  return {
    provide: context[`provide${contextName}`],
    consume: context[`use${contextName}`],
  }
}

function createConsumer (name: string) {
  const consumer = jest.fn()

  beforeEach(() => {
    consumer.mockClear()
    consumer.mockName(name)
  })

  return consumer
}

function createProvider<Contract> (contextName: string): CreateProviderResult<Contract> {
  const { provide, consume } = resolveContext(contextName)
  const ContextConsumer = createConsumer(contextName)

  const ContextConsumerComponent = defineComponent({
    setup () {
      ContextConsumer(consume())
      return () => { /*  renders nothing. */ }
    },
  })

  function renderProvider (contextValues: Contract) {
    return renderInlineComponent({
      template: '<ContextConsumerComponent/>',
      components: { ContextConsumerComponent },
      setup () {
        provide(contextValues)
      },
    })
  }

  return {
    renderProvider,
    ContextConsumer,
    ContextConsumerComponent,
  }
}

export { createProvider }
