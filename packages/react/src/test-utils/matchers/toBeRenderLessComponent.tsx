/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react'
import { render } from '@testing-library/react'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeRenderLessComponent (): R;
    }
  }
}

expect.extend({
  toBeRenderLessComponent: function (Component) {
    const { container } = render(<Component/>)

    return {
      message: () =>
        this.utils.matcherHint('toBeRenderLessComponent', Component.displayName) +
        '\n\n' +
        `Expected: The ${Component.displayName} component should not render any content by default. \n` +
        `Received: ${this.utils.printReceived(container.innerHTML)}`,
      pass: container.innerHTML === '',
    }
  },
})
