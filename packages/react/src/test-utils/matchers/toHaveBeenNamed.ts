/* eslint-disable @typescript-eslint/no-namespace */
export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenNamed (expectedName: string): R;
    }
  }
}

expect.extend({
  toHaveBeenNamed: function (Component, expectedName) {
    return {
      message: () =>
        this.utils.matcherHint('toHaveBeenNamed', Component.displayName, expectedName) +
        '\n\n' +
        `Expected: ${expectedName} \n` +
        `Received: ${Component.displayName}`,
      pass: Component.displayName === expectedName,
    }
  },
})
