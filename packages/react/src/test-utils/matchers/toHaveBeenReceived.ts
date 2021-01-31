/* eslint-disable @typescript-eslint/no-namespace */

import diff from 'jest-diff'
import { isMatch } from 'lodash'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenReceived (expected: unknown): R
    }
  }
}

expect.extend({
  toHaveBeenReceived: function (context: jest.Mock, expected) {
    const calls = context.mock.calls
    const received = calls[calls.length - 1][0]
    const diffString = diff(expected, received, { expand: this.expand })
    return {
      message: () =>
        this.utils.matcherHint('toHaveBeenReceived', context.getMockName(), 'expected') +
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
