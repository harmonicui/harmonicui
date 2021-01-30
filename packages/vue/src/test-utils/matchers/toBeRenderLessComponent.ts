/* eslint-disable @typescript-eslint/no-namespace */
import { render } from '@testing-library/vue'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeRenderLessComponent (): R;
    }
  }
}

function suppressMisusingRequiredPropsWarning (msg: string) {
  if (!msg.startsWith('Missing required prop:')) {
    console.warn(msg)
  }
}

expect.extend({
  toBeRenderLessComponent: (component) => {
    if (!component.name) {
      throw new Error('The component must contain a name')
    }

    const { container } = render(component,
      {
        global: {
          config: {
            warnHandler: suppressMisusingRequiredPropsWarning,
          },
        },
      })

    return {
      message: () =>
        `expected '${component.name}' to be a render-less component but it's rendering
         ${container.innerHTML}
        `,
      pass: container.innerHTML === '<!---->',
    }
  },
})
