// eslint-disable-next-line no-use-before-define
import React from 'react'

type Context = {
  Provide: unknown,
  consume: () => unknown
}

type Utils = {
  DefaultSlot: jest.Mock
  ContextConsumer: (props: { slotProps: unknown }) => React.ReactElement
}

function resolveContexts<T extends string> (contexts: T[]): Record<T, Context>
function resolveContexts (contexts: string[]): Record<string, Context> {
  return contexts.reduce((contexts, context) => {
    return Object.assign(
      contexts,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      { [context]: require('../contracts')[context] },
    )
  }, {})
}

function createMocks<T extends string> (names: T[]): Record<T, jest.Mock>
function createMocks (names: Array<string>): Record<string, jest.Mock> {
  return names.reduce((mocks, name) => {
    const mock = jest.fn()

    beforeEach(() => {
      mock.mockClear()
      mock.mockName(name)
    })

    return Object.assign(mocks, { [name]: mock })
  }, {})
}

function createDefaultSlot () {
  const mock = jest.fn()

  beforeEach(() => {
    mock.mockClear()
    mock.mockName('DefaultSlot')
  })

  return mock
}

function createContextTestingUtils<T extends string> (contextList: T[]): Utils & Record<T, jest.Mock>
function createContextTestingUtils (contextList: Array<string>): Utils & Record<string, jest.Mock> {
  const contexts = resolveContexts(contextList)
  const mocks = createMocks(Object.keys(contexts))
  const DefaultSlot = createDefaultSlot()

  function ContextConsumer (props: { slotProps: unknown }) {
    contextList.forEach(context => {
      mocks[context](contexts[context].consume())
    })
    DefaultSlot(props.slotProps)
    return <> {/*  renders nothing. */} </>
  }

  return Object.assign({},
    mocks,
    { DefaultSlot },
    { ContextConsumer })
}

export { createContextTestingUtils }
