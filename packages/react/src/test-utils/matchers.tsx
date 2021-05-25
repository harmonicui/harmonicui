import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeRenderLessComponent(): R

      toHaveBeenNamed(expectedName: string): R

      toRendersChildrenContent(slotContent?: string): R
    }
  }
}

expect.extend({
  toBeRenderLessComponent: function (Component) {
    const { container } = render(<Component />)

    return {
      message: () =>
        this.utils.matcherHint(
          'toBeRenderLessComponent',
          Component.displayName,
        ) +
        '\n\n' +
        `Expected: The ${Component.displayName} component should not render any content by default. \n` +
        `Received: ${this.utils.printReceived(container.innerHTML)}`,
      pass: container.innerHTML === '',
    }
  },

  toHaveBeenNamed: function (Component, expectedName) {
    return {
      message: () =>
        this.utils.matcherHint(
          'toHaveBeenNamed',
          Component.displayName,
          expectedName,
        ) +
        '\n\n' +
        `Expected: ${expectedName} \n` +
        `Received: ${Component.displayName}`,
      pass: Component.displayName === expectedName,
    }
  },

  toRendersChildrenContent: Component => {
    const { container } = render(
      <Component>
        <span>Some dummy content!</span>
      </Component>,
    )

    return {
      message: () =>
        `expected '${Component.name}' to renders default slot content.
         expected: <span>Some dummy content!</span>
         received: ${container.innerHTML}
        `,
      pass: container.innerHTML === '<span>Some dummy content!</span>',
    }
  },
})
