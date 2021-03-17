export function suppressUnperformedContractWarning<T extends unknown[]> (fn: (...args: T) => unknown) {
  return (...args: T): Promise<unknown> => {
    const spy = jest.spyOn(global.console, 'warn')
      .mockImplementation((message: string) => {
        if (!message.includes('UnperformedContractWarning')) {
          console.error(message)
        }
      })

    return new Promise<unknown>((resolve, reject) => {
      Promise.resolve(fn(...args)).then(resolve, reject)
    }).finally(() => spy.mockRestore())
  }
}
