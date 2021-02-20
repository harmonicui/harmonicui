/* eslint-disable @typescript-eslint/no-var-requires */

function mockContext (context: string): jest.SpyInstance {
  return jest.spyOn(
    require(`../contexts/${context}`),
    `provide${context}`).mockName(context)
}

function setupContexts<T extends string> (contexts: T[]): Record<T, jest.SpyInstance>
function setupContexts (contexts: string[]): Record<string, jest.SpyInstance> {
  return contexts.reduce((mocks, context) => {
    const mock = mockContext(context)

    beforeEach(() => {
      mock.mockClear()
      mock.mockName(context)
    })

    return Object.assign(mocks, { [context]: mock })
  }, {})
}

export { setupContexts }
