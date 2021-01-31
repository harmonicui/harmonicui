// eslint-disable-next-line no-use-before-define
import React, { FunctionComponent, Provider } from 'react'
import { render, RenderResult } from '@testing-library/react'

type CreateProviderResult<Contract> = {
  renderProvider (contextValues: Partial<Contract>): RenderResult
  consumer: jest.Mock
  ConsumerComponent: FunctionComponent
}

type Context<Contract> = {
  Provider: Provider<Partial<Contract>>
  use: (defaultValue?: Contract) => Contract
}

function createConsumer (name: string) {
  const consumer = jest.fn()

  beforeEach(() => {
    consumer.mockClear()
    consumer.mockName(name)
  })

  return consumer
}

function createProvider<Contract> ({
  Provider,
  use,
}: Context<Contract>, name: string): CreateProviderResult<Contract> {
  const consumer = createConsumer(name)

  function ConsumerComponent () {
    consumer(use())
    return (
      <>
        {/*  renders nothing. */}
      </>
    )
  }

  function ProviderComponent (props: { value: Partial<Contract> }) {
    return (
      <Provider value={props.value}>
        <ConsumerComponent/>
      </Provider>
    )
  }

  function renderProvider (contextValues: Partial<Contract>) {
    return render(
      <ProviderComponent value={contextValues}/>,
    )
  }

  return {
    renderProvider,
    consumer,
    ConsumerComponent,
  }
}

export { createProvider }
