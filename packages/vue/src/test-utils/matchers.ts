import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenNamed(expectedName: string): R

      toBeRenderLessComponent(): R

      toRendersDefaultSlotContent(slotContent?: string): R
    }
  }
}

expect.extend({
  toHaveBeenNamed: function (Component, expectedName) {
    return {
      message: () =>
        this.utils.matcherHint(
          'toHaveBeenNamed',
          Component.name,
          expectedName,
        ) +
        '\n\n' +
        `Expected: ${this.utils.printExpected(expectedName)} \n` +
        `Received: ${this.utils.printReceived(Component.name)}`,
      pass: Component.name === expectedName,
    }
  },

  toBeRenderLessComponent: component => {
    const { container } = render(component)
    return {
      message: () =>
        `expected '${component.name}' to be a render-less component but it's rendering
         ${container.innerHTML}
        `,
      pass: container.innerHTML === '<!---->',
    }
  },

  toRendersDefaultSlotContent: (
    component,
    slotContent = '<span>hello world!</span>',
  ) => {
    const { container } = render(component, {
      slots: {
        default: slotContent,
      },
    })
    return {
      message: () =>
        `expected '${component.name}' to renders default slot content.
         expected: ${slotContent}
         received: ${container.innerHTML}
        `,
      pass: container.innerHTML === slotContent,
    }
  },
})
