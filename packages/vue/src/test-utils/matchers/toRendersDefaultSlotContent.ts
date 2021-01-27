/* eslint-disable @typescript-eslint/no-namespace */
import { render } from '@testing-library/vue'

declare global {
  namespace jest {
    interface Matchers<R> {
      toRendersDefaultSlotContent (slotContent?: string): R;
    }
  }
}

function suppressMissingRequiredPropsWarning (msg: string) {
  if (!msg.startsWith('Missing required prop:')) {
    console.warn(msg)
  }
}

expect.extend({
  toRendersDefaultSlotContent: (component, slotContent = '<span>hello world!</span>') => {
    if (!component.name) {
      throw new Error('The component must contain a name')
    }

    const { container } = render(component, {
      slots: {
        default: slotContent,
      },
      global: {
        config: {
          warnHandler: suppressMissingRequiredPropsWarning,
        },
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
