import React from 'react'
import { render } from '@testing-library/react'
import { HelperTextContract } from '@harmonicui/contracts'
import HelperText from './HelperText'
import { HelperTextContextProvider } from '../../contexts'
import { suppressUnperformedContractWarning } from '../../test-utils'

function renderHelperTextWithProvider (context: Partial<HelperTextContract>) {
  function Provider () {
    return (
      <HelperTextContextProvider value={context}>
        <HelperText/>
      </HelperTextContextProvider>
    )
  }

  return render(<Provider/>)
}

function getHelperText () {
  return document.querySelector('span')
}

test('renders a span element',
  suppressUnperformedContractWarning(() => {
    render(<HelperText/>)
    expect(getHelperText()).not.toBeNull()
  }),
)

test('renders children content',
  suppressUnperformedContractWarning(() => {
    render(
      <HelperText>
        hello <span>world!</span>
      </HelperText>,
    )
    expect(getHelperText()).toHaveTextContent('hello world!')
  }),
)

test('consumes id from HelperTextContext', () => {
  renderHelperTextWithProvider({ id: 'description-id' })
  expect(getHelperText()).toHaveAttribute('id', 'description-id')
})

test('does not render id if not provided through HelperTextContext',
  suppressUnperformedContractWarning(() => {
    renderHelperTextWithProvider({})
    expect(getHelperText()).not.toHaveAttribute('id')
  }),
)

test('should be visible if HelperTextContext.hidden is false', () => {
  renderHelperTextWithProvider({ hidden: false })
  expect(getHelperText()).toBeVisible()
})

test('should not be visible if HelperTextContext.hidden is true', () => {
  renderHelperTextWithProvider({ hidden: true })
  expect(getHelperText()).not.toBeVisible()
})
