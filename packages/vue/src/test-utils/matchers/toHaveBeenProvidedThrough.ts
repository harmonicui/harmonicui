/* eslint-disable @typescript-eslint/no-namespace */

import diff from 'jest-diff'
import { isMatch } from 'lodash'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenProvidedThrough (context: jest.Mock | jest.SpyInstance): R
    }
  }
}

expect.extend({
  toHaveBeenProvidedThrough: function (expected, context: jest.Mock) {
    const calls = context.mock.calls
    const received = calls[calls.length - 1][0]
    const diffString = diff(expected, received, { expand: this.expand })
    return {
      message: () =>
        this.utils.matcherHint('toHaveBeenPassesThrough', 'expected', context.getMockName()) +
        '\n\n' +
        `Expected: ${this.utils.printExpected(expected)}\n` +
        `Received: ${this.utils.printReceived(received)}` +
        '\n\n' +
        (diffString && diffString.includes('- Expect')
          ? `Difference:\n\n${diffString}`
          : `Expected: ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`),
      pass: isMatch(received, expected),
    }
  },
})
