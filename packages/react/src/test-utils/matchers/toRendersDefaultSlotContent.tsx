/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react'
import { render } from '@testing-library/react'

declare global {
  namespace jest {
    interface Matchers<R> {
      toRendersDefaultSlotContent (slotContent?: string): R;
    }
  }
}

expect.extend({
  toRendersDefaultSlotContent: (Component) => {
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
