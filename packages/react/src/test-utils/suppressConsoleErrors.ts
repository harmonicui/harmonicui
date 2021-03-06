export function suppressConsoleErrors<T extends unknown[]>(
  fn: (...args: T) => unknown,
) {
  return (...args: T): Promise<unknown> => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation()

    return new Promise<unknown>((resolve, reject) => {
      Promise.resolve(fn(...args)).then(resolve, reject)
    }).finally(() => spy.mockRestore())
  }
}
